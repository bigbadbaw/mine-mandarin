import http.server, ssl, os, subprocess, sys

PORT = 8443
CERT = "cert.pem"
KEY = "key.pem"

os.chdir(os.path.dirname(os.path.abspath(__file__)) or ".")

# Generate cert if missing
if not os.path.exists(CERT) or not os.path.exists(KEY):
    print("Generating self-signed certificate...")
    env = os.environ.copy()
    # Fix openssl.cnf path on Windows with Git
    for cnf in [
        r"C:\Program Files\Git\usr\ssl\openssl.cnf",
        r"C:\Program Files\Git\mingw64\etc\ssl\openssl.cnf",
    ]:
        if os.path.exists(cnf):
            env["OPENSSL_CONF"] = cnf
            break
    else:
        with open("openssl.cnf", "w") as f:
            f.write("[req]\ndistinguished_name=dn\n[dn]\n")
        env["OPENSSL_CONF"] = os.path.abspath("openssl.cnf")

    try:
        subprocess.run([
            "openssl", "req", "-x509", "-newkey", "rsa:2048",
            "-keyout", KEY, "-out", CERT,
            "-days", "365", "-nodes",
            "-subj", "/CN=localhost"
        ], check=True, capture_output=True, env=env)
        print("Certificate generated.")
    except Exception as e:
        print(f"ERROR: Could not generate certificate: {e}")
        print("Run gen-cert.sh in Git Bash, or install OpenSSL.")
        sys.exit(1)

context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(CERT, KEY)

handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer(("0.0.0.0", PORT), handler)
httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

print(f"\n{'='*50}")
print(f"  Dragon Words — HTTPS Server")
print(f"  https://localhost:{PORT}")
print(f"  https://YOUR-IP:{PORT}  (for iPad)")
print(f"{'='*50}")
print(f"\nOn iPad Safari:")
print(f"  1. Go to https://YOUR-IP:{PORT}")
print(f"  2. Tap Advanced > Visit this website")
print(f"  3. Share > Add to Home Screen")
print(f"  4. Speech recognition works over HTTPS!")
print(f"\nPress Ctrl+C to stop.\n")

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")

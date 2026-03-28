#!/usr/bin/env python3
"""
HTTPS server for Mine Mandarin PWA.
Generates a self-signed cert on first run, then serves over HTTPS.
This is needed because iOS Safari requires HTTPS for service workers.

Usage: python serve.py
Then open https://YOUR_IP:4443 on iPad (accept the certificate warning).
"""

import http.server
import ssl
import os
import subprocess
import sys

PORT = 4443
CERT_FILE = "cert.pem"
KEY_FILE = "key.pem"

def generate_cert():
    """Generate a self-signed certificate using openssl."""
    if os.path.exists(CERT_FILE) and os.path.exists(KEY_FILE):
        print(f"Using existing certificate: {CERT_FILE}")
        return True

    print("Generating self-signed certificate...")
    try:
        # Find Git's openssl.cnf to avoid PostgreSQL's broken path
        env = os.environ.copy()
        git_ssl = r"C:\Program Files\Git\usr\ssl\openssl.cnf"
        mingw_ssl = r"C:\Program Files\Git\mingw64\etc\ssl\openssl.cnf"
        for cnf in [git_ssl, mingw_ssl]:
            if os.path.exists(cnf):
                env["OPENSSL_CONF"] = cnf
                break
        else:
            # Create a minimal config if none found
            with open("openssl.cnf", "w") as f:
                f.write("[req]\ndistinguished_name=dn\n[dn]\n")
            env["OPENSSL_CONF"] = os.path.abspath("openssl.cnf")

        subprocess.run([
            "openssl", "req", "-x509", "-newkey", "rsa:2048",
            "-keyout", KEY_FILE, "-out", CERT_FILE,
            "-days", "365", "-nodes",
            "-subj", "/CN=MineMandarin/O=Local/C=US"
        ], check=True, capture_output=True, env=env)
        print(f"Certificate generated: {CERT_FILE}")
        return True
    except FileNotFoundError:
        print("ERROR: openssl not found. Install OpenSSL or Git for Windows.")
        print("Git for Windows includes openssl - if you have git, try running from Git Bash.")
        return False
    except subprocess.CalledProcessError as e:
        print(f"ERROR generating cert: {e.stderr.decode()}")
        return False

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)) or ".")

    if not generate_cert():
        print("\nFallback: serving over HTTP (offline won't work on iPad)")
        print(f"Open http://YOUR_IP:{PORT}")
        server = http.server.HTTPServer(("0.0.0.0", PORT), http.server.SimpleHTTPRequestHandler)
        server.serve_forever()
        return

    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(CERT_FILE, KEY_FILE)

    server = http.server.HTTPServer(("0.0.0.0", PORT), http.server.SimpleHTTPRequestHandler)
    server.socket = context.wrap_socket(server.socket, server_side=True)

    print(f"\n{'='*50}")
    print(f"  Mine Mandarin HTTPS Server")
    print(f"  https://localhost:{PORT}")
    print(f"  https://YOUR_IP:{PORT}  (for iPad)")
    print(f"{'='*50}")
    print(f"\nOn iPad Safari:")
    print(f"  1. Go to https://YOUR_IP:{PORT}")
    print(f"  2. Tap 'Advanced' > 'Visit Website' to accept the cert")
    print(f"  3. Share > Add to Home Screen")
    print(f"  4. It will now work offline!")
    print(f"\nPress Ctrl+C to stop.\n")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == "__main__":
    main()

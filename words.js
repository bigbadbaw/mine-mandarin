// Mine Mandarin — Vocabulary Data & Utilities
// SU4 = Step Up 4 (original), U1–U7 = teacher units

var WORDS = [
  { id: 1, chinese: "沙漠", pinyin: "shāmò", english: "desert", source: "SU4", group: "U3L1" },
  { id: 2, chinese: "动物", pinyin: "dòngwù", english: "animal", source: "SU4", group: "U3L1" },
  { id: 3, chinese: "热水", pinyin: "rèshuǐ", english: "hot water", source: "SU4", group: "U3L1" },
  { id: 4, chinese: "森林", pinyin: "sēnlín", english: "forest", source: "SU4", group: "U3L1" },
  { id: 5, chinese: "大海", pinyin: "dàhǎi", english: "ocean/sea", source: "SU4", group: "U3L1" },
  { id: 6, chinese: "很干", pinyin: "hěn gān", english: "very dry", source: "SU4", group: "U3L1" },
  { id: 7, chinese: "海洋", pinyin: "hǎiyáng", english: "ocean", source: "SU4", group: "U3L1" },
  { id: 8, chinese: "还有", pinyin: "háiyǒu", english: "also/and also", source: "SU4", group: "U3L1" },
  { id: 9, chinese: "树干", pinyin: "shùgàn", english: "tree trunk", source: "SU4", group: "U3L1" },
  { id: 10, chinese: "昆虫", pinyin: "kūnchóng", english: "insect", source: "SU4", group: "U3L2" },
  { id: 11, chinese: "蛋", pinyin: "dàn", english: "egg", source: "SU4", group: "U3L2" },
  { id: 12, chinese: "植物", pinyin: "zhíwù", english: "plant", source: "SU4", group: "U3L2" },
  { id: 13, chinese: "陆地", pinyin: "lùdì", english: "land", source: "SU4", group: "U3L2" },
  { id: 14, chinese: "栖息地", pinyin: "qīxīdì", english: "habitat", source: "SU4", group: "U3L2" },
  { id: 15, chinese: "湿地", pinyin: "shīdì", english: "wetland", source: "SU4", group: "U3L2" },
  { id: 16, chinese: "环境", pinyin: "huánjìng", english: "environment", source: "SU4", group: "U3L2" },
  { id: 17, chinese: "水鸟", pinyin: "shuǐniǎo", english: "water bird", source: "SU4", group: "U3L2" },
  { id: 18, chinese: "之间", pinyin: "zhījiān", english: "between/among", source: "SU4", group: "U3L2" },
  { id: 19, chinese: "食物链", pinyin: "shíwùliàn", english: "food chain", source: "SU4", group: "U3L3" },
  { id: 20, chinese: "重要", pinyin: "zhòngyào", english: "important", source: "SU4", group: "U3L3" },
  { id: 21, chinese: "组成", pinyin: "zǔchéng", english: "to compose/make up", source: "SU4", group: "U3L3" },
  { id: 22, chinese: "阳光", pinyin: "yángguāng", english: "sunlight", source: "SU4", group: "U3L3" },
  { id: 23, chinese: "地球", pinyin: "dìqiú", english: "Earth/globe", source: "SU4", group: "U3L3" },
  { id: 24, chinese: "各种各样", pinyin: "gèzhǒng gèyàng", english: "all kinds of", source: "SU4", group: "U3L3" },
  { id: 25, chinese: "开始", pinyin: "kāishǐ", english: "to begin/start", source: "SU4", group: "U3L3" },
  { id: 26, chinese: "放风筝", pinyin: "fàng fēngzheng", english: "fly a kite", source: "SU4", group: "U5L1" },
  { id: 27, chinese: "划船", pinyin: "huáchuán", english: "row a boat", source: "SU4", group: "U5L1" },
  { id: 28, chinese: "爬山", pinyin: "páshān", english: "climb a mountain", source: "SU4", group: "U5L1" },
  { id: 29, chinese: "大雁", pinyin: "dàyàn", english: "wild goose", source: "SU4", group: "U5L1" },
  { id: 30, chinese: "滑雪", pinyin: "huáxuě", english: "skiing", source: "SU4", group: "U5L1" },
  { id: 31, chinese: "风景", pinyin: "fēngjǐng", english: "scenery/landscape", source: "SU4", group: "U5L1" },
  { id: 32, chinese: "春天", pinyin: "chūntiān", english: "spring (season)", source: "SU4", group: "U5L1" },
  { id: 33, chinese: "花儿", pinyin: "huār", english: "flower", source: "SU4", group: "U5L1" },
  { id: 34, chinese: "季节", pinyin: "jìjié", english: "season", source: "SU4", group: "U5L1" },
  { id: 35, chinese: "回答", pinyin: "huídá", english: "to answer", source: "SU4", group: "U5L2" },
  { id: 36, chinese: "下雨", pinyin: "xiàyǔ", english: "to rain", source: "SU4", group: "U5L2" },
  { id: 37, chinese: "玩儿", pinyin: "wánr", english: "to play", source: "SU4", group: "U5L2" },
  { id: 38, chinese: "昨天", pinyin: "zuótiān", english: "yesterday", source: "SU4", group: "U5L2" },
  { id: 39, chinese: "怎么样", pinyin: "zěnmeyàng", english: "how/what's it like", source: "SU4", group: "U5L2" },
  { id: 40, chinese: "睡觉", pinyin: "shuìjiào", english: "to sleep", source: "SU4", group: "U5L2" },
  { id: 41, chinese: "接着", pinyin: "jiēzhe", english: "then/followed by", source: "SU4", group: "U5L2" },
  { id: 42, chinese: "时候", pinyin: "shíhòu", english: "time/moment/when", source: "SU4", group: "U5L2" },
  { id: 43, chinese: "天气", pinyin: "tiānqì", english: "weather", source: "SU4", group: "U5L2" },
  { id: 44, chinese: "滚雪球", pinyin: "gǔn xuěqiú", english: "roll a snowball", source: "SU4", group: "U5L3" },
  { id: 45, chinese: "胳膊", pinyin: "gēbo", english: "arm", source: "SU4", group: "U5L3" },
  { id: 46, chinese: "胡萝卜", pinyin: "húluóbo", english: "carrot", source: "SU4", group: "U5L3" },
  { id: 47, chinese: "扣子", pinyin: "kòuzi", english: "button", source: "SU4", group: "U5L3" },
  { id: 48, chinese: "窗外", pinyin: "chuāngwài", english: "outside the window", source: "SU4", group: "U5L3" },
  { id: 49, chinese: "周围", pinyin: "zhōuwéi", english: "surroundings/around", source: "SU4", group: "U5L3" },
  { id: 50, chinese: "围巾", pinyin: "wéijīn", english: "scarf", source: "SU4", group: "U5L3" },
  { id: 51, chinese: "戴帽子", pinyin: "dài màozi", english: "wear a hat", source: "SU4", group: "U5L3" },
  { id: 52, chinese: "堆雪人", pinyin: "duī xuěrén", english: "build a snowman", source: "SU4", group: "U5L3" },
  { id: 53, chinese: "老师", pinyin: "lǎo shī", english: "teacher", source: "U1", group: "W1" },
  { id: 54, chinese: "岁", pinyin: "suì", english: "years old", source: "U1", group: "W1" },
  { id: 55, chinese: "蛋糕", pinyin: "dàn gāo", english: "cake", source: "U1", group: "W1" },
  { id: 56, chinese: "喜欢", pinyin: "xǐ huān", english: "to like", source: "U1", group: "W1" },
  { id: 57, chinese: "猫", pinyin: "māo", english: "cat", source: "U1", group: "W1" },
  { id: 58, chinese: "橙色", pinyin: "chéng sè", english: "orange (color)", source: "U1", group: "W1" },
  { id: 59, chinese: "草莓", pinyin: "cǎo méi", english: "strawberry", source: "U1", group: "W1" },
  { id: 60, chinese: "聊天", pinyin: "liáo tiān", english: "to chat", source: "U1", group: "W1" },
  { id: 61, chinese: "游乐园", pinyin: "yóu lè yuán", english: "amusement park", source: "U1", group: "W1" },
  { id: 62, chinese: "设施", pinyin: "shè shī", english: "attractions/facilities", source: "U1", group: "W1" },
  { id: 63, chinese: "时间", pinyin: "shí jiān", english: "time", source: "U1", group: "W2" },
  { id: 64, chinese: "洗脸", pinyin: "xǐ liǎn", english: "wash face", source: "U1", group: "W2" },
  { id: 65, chinese: "早饭", pinyin: "zǎo fàn", english: "breakfast", source: "U1", group: "W2" },
  { id: 66, chinese: "背书包", pinyin: "bēi shū bāo", english: "carry backpack", source: "U1", group: "W2" },
  { id: 67, chinese: "着急", pinyin: "zháo jí", english: "to feel anxious", source: "U1", group: "W2" },
  { id: 68, chinese: "马路", pinyin: "mǎ lù", english: "road", source: "U1", group: "W2" },
  { id: 69, chinese: "辆", pinyin: "liàng", english: "measure word (vehicles)", source: "U1", group: "W2" },
  { id: 70, chinese: "觉得", pinyin: "jué de", english: "to think/feel", source: "U1", group: "W2" },
  { id: 71, chinese: "好像", pinyin: "hǎo xiàng", english: "seems like", source: "U1", group: "W2" },
  { id: 72, chinese: "撞", pinyin: "zhuàng", english: "to hit/collide", source: "U1", group: "W2" },
  { id: 73, chinese: "马上", pinyin: "mǎ shàng", english: "immediately", source: "U1", group: "W2" },
  { id: 74, chinese: "抱", pinyin: "bào", english: "to hug", source: "U1", group: "W2" },
  { id: 75, chinese: "救", pinyin: "jiù", english: "to save", source: "U1", group: "W2" },
  { id: 76, chinese: "主要", pinyin: "zhǔ yào", english: "main/major", source: "U1", group: "W3" },
  { id: 77, chinese: "生存", pinyin: "shēng cún", english: "to survive", source: "U1", group: "W3" },
  { id: 78, chinese: "东北", pinyin: "dōng běi", english: "northeast", source: "U1", group: "W3" },
  { id: 79, chinese: "坚果", pinyin: "jiān guǒ", english: "nut", source: "U1", group: "W3" },
  { id: 80, chinese: "果子", pinyin: "guǒ zi", english: "berries/fruit", source: "U1", group: "W3" },
  { id: 81, chinese: "蔬菜", pinyin: "shū cài", english: "vegetables", source: "U1", group: "W3" },
  { id: 82, chinese: "南瓜", pinyin: "nán guā", english: "pumpkin", source: "U1", group: "W3" },
  { id: 83, chinese: "豆子", pinyin: "dòu zǐ", english: "beans", source: "U1", group: "W3" },
  { id: 84, chinese: "平原", pinyin: "píng yuán", english: "plain/prairie", source: "U1", group: "W3" },
  { id: 85, chinese: "野牛", pinyin: "yě niú", english: "buffalo", source: "U1", group: "W3" },
  { id: 86, chinese: "西北", pinyin: "xī běi", english: "northwest", source: "U1", group: "W3" },
  { id: 87, chinese: "迁移", pinyin: "qiān yí", english: "to migrate", source: "U1", group: "W3" },
  { id: 88, chinese: "晒干", pinyin: "shài gān", english: "dried in sun", source: "U1", group: "W3" },
  { id: 89, chinese: "打猎", pinyin: "dǎ liè", english: "to hunt", source: "U1", group: "W3" },
  { id: 90, chinese: "抓", pinyin: "zhuā", english: "to catch", source: "U1", group: "W3" },
  { id: 91, chinese: "肉干", pinyin: "ròu gān", english: "dried meat", source: "U1", group: "W3" },
  { id: 92, chinese: "收集", pinyin: "shōu jí", english: "to collect", source: "U1", group: "W3" },
  { id: 93, chinese: "或者", pinyin: "huò zhě", english: "or", source: "U1", group: "W4" },
  { id: 94, chinese: "孩子", pinyin: "hái zi", english: "child/children", source: "U1", group: "W4" },
  { id: 95, chinese: "相信", pinyin: "xiāng xìn", english: "to believe/trust", source: "U1", group: "W4" },
  { id: 96, chinese: "东", pinyin: "dōng", english: "east", source: "U1", group: "W5" },
  { id: 97, chinese: "西", pinyin: "xī", english: "west", source: "U1", group: "W5" },
  { id: 98, chinese: "南", pinyin: "nán", english: "south", source: "U1", group: "W5" },
  { id: 99, chinese: "北", pinyin: "běi", english: "north", source: "U1", group: "W5" },
  { id: 100, chinese: "靠", pinyin: "kào", english: "to rely on/near", source: "U1", group: "W5" },
  { id: 101, chinese: "窄", pinyin: "zhǎi", english: "narrow", source: "U1", group: "W5" },
  { id: 102, chinese: "有趣", pinyin: "yǒu qù", english: "interesting/fun", source: "U1", group: "W5" },
  { id: 103, chinese: "知道", pinyin: "zhī dào", english: "to know", source: "U2", group: "W1" },
  { id: 104, chinese: "明白", pinyin: "míng bái", english: "to understand", source: "U2", group: "W1" },
  { id: 105, chinese: "懂", pinyin: "dǒng", english: "to understand/get it", source: "U2", group: "W1" },
  { id: 106, chinese: "进去", pinyin: "jìn qù", english: "to go in/enter", source: "U2", group: "W1" },
  { id: 107, chinese: "自己", pinyin: "zì jǐ", english: "oneself", source: "U2", group: "W2" },
  { id: 108, chinese: "来自", pinyin: "lái zì", english: "to come from", source: "U2", group: "W2" },
  { id: 109, chinese: "叫做", pinyin: "jiào zuò", english: "to be called/named", source: "U2", group: "W2" },
  { id: 110, chinese: "语言", pinyin: "yǔ yán", english: "language", source: "U2", group: "W2" },
  { id: 111, chinese: "友好", pinyin: "yǒu hǎo", english: "friendly", source: "U2", group: "W2" },
  { id: 112, chinese: "了解", pinyin: "liǎo jiě", english: "to understand/know about", source: "U2", group: "W2" },
  { id: 113, chinese: "美国", pinyin: "měi guó", english: "America/USA", source: "U2", group: "W3" },
  { id: 114, chinese: "后来", pinyin: "hòu lái", english: "afterwards/later", source: "U2", group: "W3" },
  { id: 115, chinese: "希望", pinyin: "xī wàng", english: "to hope/wish", source: "U2", group: "W3" },
  { id: 116, chinese: "长大", pinyin: "zhǎng dà", english: "to grow up", source: "U2", group: "W3" },
  { id: 117, chinese: "改变", pinyin: "gǎi biàn", english: "to change", source: "U2", group: "W3" },
  { id: 118, chinese: "平等", pinyin: "píng děng", english: "equality", source: "U2", group: "W3" },
  { id: 119, chinese: "加州", pinyin: "jiā zhōu", english: "California", source: "U2", group: "W4" },
  { id: 120, chinese: "政府", pinyin: "zhèng fǔ", english: "government", source: "U2", group: "W4" },
  { id: 121, chinese: "部门", pinyin: "bù mén", english: "department", source: "U2", group: "W4" },
  { id: 122, chinese: "卫生", pinyin: "wèi shēng", english: "hygiene/health", source: "U2", group: "W4" },
  { id: 123, chinese: "环卫工人", pinyin: "huán wèi gōng rén", english: "sanitation worker", source: "U2", group: "W4" },
  { id: 124, chinese: "干净", pinyin: "gān jìng", english: "clean", source: "U2", group: "W4" },
  { id: 125, chinese: "净化", pinyin: "jìng huà", english: "to purify", source: "U2", group: "W4" },
  { id: 126, chinese: "公园", pinyin: "gōng yuán", english: "park", source: "U2", group: "W4" },
  { id: 127, chinese: "娱乐", pinyin: "yú lè", english: "entertainment/recreation", source: "U2", group: "W4" },
  { id: 128, chinese: "参加", pinyin: "cān jiā", english: "to participate", source: "U2", group: "W4" },
  { id: 129, chinese: "权利", pinyin: "quán lì", english: "rights", source: "U2", group: "W4" },
  { id: 130, chinese: "安全", pinyin: "ān quán", english: "safety/safe", source: "U2", group: "W4" },
  { id: 131, chinese: "保护", pinyin: "bǎo hù", english: "to protect", source: "U2", group: "W4" },
  { id: 132, chinese: "消防员", pinyin: "xiāo fáng yuán", english: "firefighter", source: "U2", group: "W4" },
  { id: 133, chinese: "带到", pinyin: "dài dào", english: "to bring to", source: "U3", group: "W1" },
  { id: 134, chinese: "美味", pinyin: "měi wèi", english: "delicious", source: "U3", group: "W1" },
  { id: 135, chinese: "地方", pinyin: "dì fāng", english: "place", source: "U3", group: "W1" },
  { id: 136, chinese: "种植", pinyin: "zhòng zhí", english: "to plant/cultivate", source: "U3", group: "W1" },
  { id: 137, chinese: "卖给", pinyin: "mài gěi", english: "to sell to", source: "U3", group: "W2" },
  { id: 138, chinese: "学习", pinyin: "xué xí", english: "to study/learn", source: "U3", group: "W2" },
  { id: 139, chinese: "家人", pinyin: "jiā rén", english: "family", source: "U3", group: "W2" },
  { id: 140, chinese: "工作", pinyin: "gōng zuò", english: "work/job", source: "U3", group: "W2" },
  { id: 141, chinese: "出名", pinyin: "chū míng", english: "famous", source: "U3", group: "W2" },
  { id: 142, chinese: "中国", pinyin: "zhōng guó", english: "China", source: "U3", group: "W3" },
  { id: 143, chinese: "很多", pinyin: "hěn duō", english: "many/a lot", source: "U3", group: "W3" },
  { id: 144, chinese: "认识", pinyin: "rèn shì", english: "to know/recognize", source: "U3", group: "W3" },
  { id: 145, chinese: "东西", pinyin: "dōng xī", english: "things/stuff", source: "U3", group: "W3" },
  { id: 146, chinese: "居住", pinyin: "jū zhù", english: "to live/reside", source: "U3", group: "W4" },
  { id: 147, chinese: "最早", pinyin: "zuì zǎo", english: "earliest", source: "U3", group: "W4" },
  { id: 148, chinese: "得到", pinyin: "dé dào", english: "to get/obtain", source: "U3", group: "W4" },
  { id: 149, chinese: "土地", pinyin: "tǔ dì", english: "land/soil", source: "U3", group: "W4" },
  { id: 150, chinese: "建立", pinyin: "jiàn lì", english: "to establish", source: "U3", group: "W4" },
  { id: 151, chinese: "找", pinyin: "zhǎo", english: "to find/look for", source: "U3", group: "W4" },
  { id: 152, chinese: "发现", pinyin: "fā xiàn", english: "to discover", source: "U3", group: "W4" },
  { id: 153, chinese: "北美洲", pinyin: "běi měi zhōu", english: "North America", source: "U4", group: "W1" },
  { id: 154, chinese: "非洲", pinyin: "fēi zhōu", english: "Africa", source: "U4", group: "W1" },
  { id: 155, chinese: "欧洲", pinyin: "ōu zhōu", english: "Europe", source: "U4", group: "W1" },
  { id: 156, chinese: "亚洲", pinyin: "yà zhōu", english: "Asia", source: "U4", group: "W1" },
  { id: 157, chinese: "大洋洲", pinyin: "dà yáng zhōu", english: "Oceania/Australia", source: "U4", group: "W1" },
  { id: 158, chinese: "太平洋", pinyin: "tài píng yáng", english: "Pacific Ocean", source: "U4", group: "W1" },
  { id: 159, chinese: "大西洋", pinyin: "dà xī yáng", english: "Atlantic Ocean", source: "U4", group: "W1" },
  { id: 160, chinese: "图例", pinyin: "tú lì", english: "map legend", source: "U4", group: "W1" },
  { id: 161, chinese: "符号", pinyin: "fú hào", english: "symbol", source: "U4", group: "W1" },
  { id: 162, chinese: "意思", pinyin: "yì si", english: "meaning", source: "U4", group: "W1" },
  { id: 163, chinese: "方向", pinyin: "fāng xiàng", english: "direction", source: "U4", group: "W1" },
  { id: 164, chinese: "作用", pinyin: "zuò yòng", english: "function/use", source: "U4", group: "W1" },
  { id: 165, chinese: "地铁", pinyin: "dì tiě", english: "metro/subway", source: "U4", group: "W1" },
  { id: 166, chinese: "动物园", pinyin: "dòng wù yuán", english: "zoo", source: "U4", group: "W1" },
  { id: 167, chinese: "其他", pinyin: "qí tā", english: "other", source: "U4", group: "W1" },
  { id: 168, chinese: "美丽的", pinyin: "měi lì de", english: "beautiful", source: "U4", group: "W2" },
  { id: 169, chinese: "地区", pinyin: "dì qū", english: "area/region", source: "U4", group: "W2" },
  { id: 170, chinese: "气候", pinyin: "qì hòu", english: "climate", source: "U4", group: "W2" },
  { id: 171, chinese: "大量的", pinyin: "dà liàng de", english: "lots of", source: "U4", group: "W2" },
  { id: 172, chinese: "土狼", pinyin: "tǔ láng", english: "coyote", source: "U4", group: "W2" },
  { id: 173, chinese: "散步", pinyin: "sàn bù", english: "to walk/stroll", source: "U4", group: "W2" },
  { id: 174, chinese: "红杉树", pinyin: "hóng shān shù", english: "redwood tree", source: "U4", group: "W2" },
  { id: 175, chinese: "鹿", pinyin: "lù", english: "deer", source: "U4", group: "W2" },
  { id: 176, chinese: "黑熊", pinyin: "hēi xióng", english: "black bear", source: "U4", group: "W2" },
  { id: 177, chinese: "美洲狮", pinyin: "měi zhōu shī", english: "cougar/mountain lion", source: "U4", group: "W2" },
  { id: 178, chinese: "旅行", pinyin: "lǚ xíng", english: "to travel", source: "U4", group: "W2" },
  { id: 179, chinese: "首都", pinyin: "shǒu dū", english: "capital city", source: "U4", group: "W2" },
  { id: 180, chinese: "块", pinyin: "kuài", english: "yuan (money)/measure word", source: "U4", group: "W3" },
  { id: 181, chinese: "条", pinyin: "tiáo", english: "measure word (long things)", source: "U4", group: "W3" },
  { id: 182, chinese: "支", pinyin: "zhī", english: "measure word (slender objects)", source: "U4", group: "W3" },
  { id: 183, chinese: "甜", pinyin: "tián", english: "sweet", source: "U4", group: "W3" },
  { id: 184, chinese: "一共", pinyin: "yī gòng", english: "altogether/total", source: "U4", group: "W3" },
  { id: 185, chinese: "笔", pinyin: "bǐ", english: "pen/writing brush", source: "U4", group: "W3" },
  { id: 186, chinese: "当地食物", pinyin: "dāng dì shí wù", english: "local food", source: "U4", group: "W4" },
  { id: 187, chinese: "附近", pinyin: "fù jìn", english: "nearby", source: "U4", group: "W4" },
  { id: 188, chinese: "水果", pinyin: "shuǐ guǒ", english: "fruits", source: "U4", group: "W4" },
  { id: 189, chinese: "营养", pinyin: "yíng yǎng", english: "nutritious/nutrition", source: "U4", group: "W4" },
  { id: 190, chinese: "健康", pinyin: "jiàn kāng", english: "healthy/health", source: "U4", group: "W4" },
  { id: 191, chinese: "帮助", pinyin: "bāng zhù", english: "to help", source: "U4", group: "W4" },
  { id: 192, chinese: "农民", pinyin: "nóng mín", english: "farmer", source: "U4", group: "W4" },
  { id: 193, chinese: "仙人掌", pinyin: "xiān rén zhǎng", english: "cactus", source: "U5", group: "W1" },
  { id: 194, chinese: "家乡", pinyin: "jiā xiāng", english: "hometown", source: "U5", group: "W1" },
  { id: 195, chinese: "南美洲", pinyin: "nán měi zhōu", english: "South America", source: "U5", group: "W1" },
  { id: 196, chinese: "墨西哥", pinyin: "mò xī gē", english: "Mexico", source: "U5", group: "W1" },
  { id: 197, chinese: "扁", pinyin: "biǎn", english: "flat", source: "U5", group: "W1" },
  { id: 198, chinese: "胖", pinyin: "pàng", english: "fat/chubby", source: "U5", group: "W1" },
  { id: 199, chinese: "干旱", pinyin: "gān hàn", english: "drought/dry", source: "U5", group: "W1" },
  { id: 200, chinese: "茎", pinyin: "jīng", english: "stem", source: "U5", group: "W1" },
  { id: 201, chinese: "储存", pinyin: "chǔ cún", english: "to store", source: "U5", group: "W1" },
  { id: 202, chinese: "细", pinyin: "xì", english: "thin/fine", source: "U5", group: "W1" },
  { id: 203, chinese: "尖", pinyin: "jiān", english: "sharp/pointed", source: "U5", group: "W1" },
  { id: 204, chinese: "刺", pinyin: "cì", english: "spine/thorn", source: "U5", group: "W1" },
  { id: 205, chinese: "保存", pinyin: "bǎo cún", english: "to preserve/store", source: "U5", group: "W1" },
  { id: 206, chinese: "根", pinyin: "gēn", english: "root", source: "U5", group: "W1" },
  { id: 207, chinese: "伸", pinyin: "shēn", english: "to spread/extend", source: "U5", group: "W1" },
  { id: 208, chinese: "远", pinyin: "yuǎn", english: "far", source: "U5", group: "W1" },
  { id: 209, chinese: "强大", pinyin: "qiáng dà", english: "strong/resilient", source: "U5", group: "W1" },
  { id: 210, chinese: "变化", pinyin: "biàn huà", english: "change", source: "U5", group: "W2" },
  { id: 211, chinese: "生长", pinyin: "shēng zhǎng", english: "to grow", source: "U5", group: "W2" },
  { id: 212, chinese: "种子", pinyin: "zhǒng zǐ", english: "seed", source: "U5", group: "W2" },
  { id: 213, chinese: "食物", pinyin: "shí wù", english: "food", source: "U5", group: "W2" },
  { id: 214, chinese: "周期", pinyin: "zhōu qī", english: "cycle", source: "U5", group: "W2" },
  { id: 215, chinese: "泥土", pinyin: "ní tǔ", english: "soil", source: "U5", group: "W2" },
  { id: 216, chinese: "果实", pinyin: "guǒ shí", english: "fruit", source: "U5", group: "W2" },
  { id: 217, chinese: "吸引", pinyin: "xī yǐn", english: "to attract", source: "U5", group: "W2" },
  { id: 218, chinese: "蜜蜂", pinyin: "mì fēng", english: "bee", source: "U5", group: "W2" },
  { id: 219, chinese: "向日葵", pinyin: "xiàng rì kuí", english: "sunflower", source: "U5", group: "W2" },
  { id: 220, chinese: "放大镜", pinyin: "fàng dà jìng", english: "magnifying glass", source: "U5", group: "W2" },
  { id: 221, chinese: "吸收", pinyin: "xī shōu", english: "to absorb", source: "U5", group: "W2" },
  { id: 222, chinese: "叶绿素", pinyin: "yè lǜ sù", english: "chlorophyll", source: "U5", group: "W2" },
  { id: 223, chinese: "光合作用", pinyin: "guāng hé zuò yòng", english: "photosynthesis", source: "U5", group: "W2" },
  { id: 224, chinese: "授粉", pinyin: "shòu fěn", english: "pollination", source: "U5", group: "W2" },
  { id: 225, chinese: "呼吸", pinyin: "hū xī", english: "to breathe", source: "U5", group: "W3" },
  { id: 226, chinese: "休息", pinyin: "xiū xi", english: "to rest", source: "U5", group: "W3" },
  { id: 227, chinese: "北极熊", pinyin: "běi jí xióng", english: "polar bear", source: "U5", group: "W3" },
  { id: 228, chinese: "冷", pinyin: "lěng", english: "cold", source: "U5", group: "W3" },
  { id: 229, chinese: "厚厚的", pinyin: "hòu hòu de", english: "thick", source: "U5", group: "W3" },
  { id: 230, chinese: "皮毛", pinyin: "pí máo", english: "fur", source: "U5", group: "W3" },
  { id: 231, chinese: "草原", pinyin: "cǎo yuán", english: "grassland", source: "U5", group: "W3" },
  { id: 232, chinese: "比如", pinyin: "bǐ rú", english: "for example", source: "U5", group: "W3" },
  { id: 233, chinese: "老虎", pinyin: "lǎo hǔ", english: "tiger", source: "U5", group: "W3" },
  { id: 234, chinese: "松鼠", pinyin: "sōng shǔ", english: "squirrel", source: "U5", group: "W3" },
  { id: 235, chinese: "气象员", pinyin: "qì xiàng yuán", english: "meteorologist", source: "U6", group: "W1" },
  { id: 236, chinese: "叔叔", pinyin: "shū shu", english: "uncle", source: "U6", group: "W1" },
  { id: 237, chinese: "刮", pinyin: "guā", english: "to blow (wind)", source: "U6", group: "W1" },
  { id: 238, chinese: "摇晃", pinyin: "yáo huàng", english: "to shake", source: "U6", group: "W1" },
  { id: 239, chinese: "湿", pinyin: "shī", english: "wet", source: "U6", group: "W1" },
  { id: 240, chinese: "地面", pinyin: "dì miàn", english: "ground/floor", source: "U6", group: "W1" },
  { id: 241, chinese: "晴朗", pinyin: "qíng lǎng", english: "sunny/clear", source: "U6", group: "W1" },
  { id: 242, chinese: "感觉", pinyin: "gǎn jué", english: "feeling/to feel", source: "U6", group: "W1" },
  { id: 243, chinese: "温暖", pinyin: "wēn nuǎn", english: "warm", source: "U6", group: "W1" },
  { id: 244, chinese: "飞舞的", pinyin: "fēi wǔ de", english: "flying/dancing", source: "U6", group: "W1" },
  { id: 245, chinese: "大气状况", pinyin: "dà qì zhuàng kuàng", english: "state of atmosphere", source: "U6", group: "W1" },
  { id: 246, chinese: "描述", pinyin: "miáo shù", english: "to describe", source: "U6", group: "W1" },
  { id: 247, chinese: "研究", pinyin: "yán jiū", english: "to study/research", source: "U6", group: "W1" },
  { id: 248, chinese: "并且", pinyin: "bìng qiě", english: "and/also", source: "U6", group: "W1" },
  { id: 249, chinese: "准备", pinyin: "zhǔn bèi", english: "to prepare", source: "U6", group: "W2" },
  { id: 250, chinese: "房子", pinyin: "fáng zi", english: "house", source: "U6", group: "W2" },
  { id: 251, chinese: "暴风雨", pinyin: "bào fēng yǔ", english: "storm", source: "U6", group: "W2" },
  { id: 252, chinese: "超市", pinyin: "chāo shì", english: "supermarket", source: "U6", group: "W2" },
  { id: 253, chinese: "需要", pinyin: "xū yào", english: "to need", source: "U6", group: "W2" },
  { id: 254, chinese: "树枝", pinyin: "shù zhī", english: "tree branch", source: "U6", group: "W2" },
  { id: 255, chinese: "蜡烛", pinyin: "là zhú", english: "candle", source: "U6", group: "W2" },
  { id: 256, chinese: "修剪", pinyin: "xiū jiǎn", english: "to trim", source: "U6", group: "W2" },
  { id: 257, chinese: "提醒", pinyin: "tí xǐng", english: "to remind", source: "U6", group: "W2" },
  { id: 258, chinese: "停电", pinyin: "tíng diàn", english: "power outage", source: "U6", group: "W2" },
  { id: 259, chinese: "手电筒", pinyin: "shǒu diàn tǒng", english: "flashlight", source: "U6", group: "W2" },
  { id: 260, chinese: "沙袋", pinyin: "shā dài", english: "sandbag", source: "U6", group: "W2" },
  { id: 261, chinese: "地点", pinyin: "dì diǎn", english: "location", source: "U6", group: "W3" },
  { id: 262, chinese: "寒冷", pinyin: "hán lěng", english: "cold/frigid", source: "U6", group: "W3" },
  { id: 263, chinese: "极地地区", pinyin: "jí dì dì qū", english: "polar regions", source: "U6", group: "W3" },
  { id: 264, chinese: "防风", pinyin: "fáng fēng", english: "wind-proof", source: "U6", group: "W3" },
  { id: 265, chinese: "保暖", pinyin: "bǎo nuǎn", english: "to keep warm", source: "U6", group: "W3" },
  { id: 266, chinese: "木屋", pinyin: "mù wū", english: "wooden house", source: "U6", group: "W3" },
  { id: 267, chinese: "炎热", pinyin: "yán rè", english: "hot/scorching", source: "U6", group: "W3" },
  { id: 268, chinese: "砖", pinyin: "zhuān", english: "brick", source: "U6", group: "W3" },
  { id: 269, chinese: "高架屋", pinyin: "gāo jià wū", english: "stilt house", source: "U6", group: "W3" },
  { id: 270, chinese: "东南亚", pinyin: "dōng nán yà", english: "Southeast Asia", source: "U6", group: "W3" },
  { id: 271, chinese: "西非", pinyin: "xī fēi", english: "West Africa", source: "U6", group: "W3" },
  { id: 272, chinese: "通风", pinyin: "tōng fēng", english: "ventilation", source: "U6", group: "W3" },
  { id: 273, chinese: "隔潮", pinyin: "gé cháo", english: "damp-proof", source: "U6", group: "W3" },
  { id: 274, chinese: "推", pinyin: "tuī", english: "to push", source: "U7", group: "W1" },
  { id: 275, chinese: "拉", pinyin: "lā", english: "to pull", source: "U7", group: "W1" },
  { id: 276, chinese: "骑", pinyin: "qí", english: "to ride", source: "U7", group: "W1" },
  { id: 277, chinese: "自行车", pinyin: "zì xíng chē", english: "bicycle", source: "U7", group: "W1" },
  { id: 278, chinese: "用力", pinyin: "yòng lì", english: "to exert force", source: "U7", group: "W1" },
  { id: 279, chinese: "移动", pinyin: "yí dòng", english: "to move", source: "U7", group: "W1" },
  { id: 280, chinese: "写字", pinyin: "xiě zì", english: "to write", source: "U7", group: "W1" },
  { id: 281, chinese: "吹动", pinyin: "chuī dòng", english: "to blow", source: "U7", group: "W1" },
  { id: 282, chinese: "落叶", pinyin: "luò yè", english: "falling leaves", source: "U7", group: "W1" },
  { id: 283, chinese: "重力", pinyin: "zhòng lì", english: "gravity", source: "U7", group: "W1" },
  { id: 284, chinese: "越", pinyin: "yuè", english: "the more... (comparative)", source: "U7", group: "W1" },
  { id: 285, chinese: "近", pinyin: "jìn", english: "near/close", source: "U7", group: "W1" },
  { id: 286, chinese: "摩擦力", pinyin: "mó cā lì", english: "friction", source: "U7", group: "W1" },
  { id: 287, chinese: "物体", pinyin: "wù tǐ", english: "object", source: "U7", group: "W2" },
  { id: 288, chinese: "产生", pinyin: "chǎn shēng", english: "to produce/generate", source: "U7", group: "W2" },
  { id: 289, chinese: "停止", pinyin: "tíng zhǐ", english: "to stop", source: "U7", group: "W2" },
  { id: 290, chinese: "减少", pinyin: "jiǎn shǎo", english: "to reduce", source: "U7", group: "W2" },
  { id: 291, chinese: "光滑", pinyin: "guāng huá", english: "smooth", source: "U7", group: "W2" },
  { id: 292, chinese: "有用", pinyin: "yǒu yòng", english: "useful", source: "U7", group: "W2" },
  { id: 293, chinese: "降落伞", pinyin: "jiàng luò sǎn", english: "parachute", source: "U7", group: "W2" },
  { id: 294, chinese: "轮胎", pinyin: "lún tāi", english: "tire", source: "U7", group: "W2" },
  { id: 295, chinese: "摔倒", pinyin: "shuāi dǎo", english: "to fall down", source: "U7", group: "W2" },
  { id: 296, chinese: "扭开", pinyin: "niǔ kāi", english: "to twist open", source: "U7", group: "W2" },
  { id: 297, chinese: "瓶盖", pinyin: "píng gài", english: "bottle cap", source: "U7", group: "W2" },
];

// ============================================================
//  MINECRAFT ASSET CDN
// ============================================================
var MC_CDN_ITEM = 'https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.21.1/assets/minecraft/textures/item/';
var MC_CDN_BLOCK = 'https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.21.1/assets/minecraft/textures/block/';

var MC_ICONS = {
  diamond:    MC_CDN_ITEM + 'diamond.png',
  wooden_sword: MC_CDN_ITEM + 'wooden_sword.png',
  stone_sword:  MC_CDN_ITEM + 'stone_sword.png',
  iron_sword:   MC_CDN_ITEM + 'iron_sword.png',
  diamond_sword: MC_CDN_ITEM + 'diamond_sword.png',
  netherite_sword: MC_CDN_ITEM + 'netherite_sword.png',
  blaze_powder: MC_CDN_ITEM + 'blaze_powder.png',
  book:         MC_CDN_ITEM + 'book.png',
  enchanted_book: MC_CDN_ITEM + 'enchanted_book.png',
  paper:        MC_CDN_ITEM + 'paper.png',
  emerald:      MC_CDN_ITEM + 'emerald.png',
  redstone:     MC_CDN_ITEM + 'redstone.png',
  note_block:   MC_CDN_BLOCK + 'note_block.png',
  tnt_side:     MC_CDN_BLOCK + 'tnt_side.png',
  grass_block:  MC_CDN_BLOCK + 'grass_block_side.png',
};

// Helper to create an <img> with fallback
var MC_FALLBACK_COLORS = {
  diamond: '#5DE8F0', wooden_sword: '#A47834', stone_sword: '#7A7A7A',
  iron_sword: '#CCCCCC', diamond_sword: '#5DE8F0', netherite_sword: '#333333',
  blaze_powder: '#FFD700', book: '#86642A', enchanted_book: '#9B59B6',
  paper: '#F5F5DC', emerald: '#5A9B3C', redstone: '#CC3333',
  note_block: '#86642A', tnt_side: '#CC3333', grass_block: '#5A9B3C',
};

function mcIconFallback(el) {
  var w = el.width || 32;
  var c = el.getAttribute('data-fallback') || '#7A7A7A';
  var d = document.createElement('div');
  d.style.cssText = 'width:' + w + 'px;height:' + w + 'px;background:' + c + ';border:2px solid #000;display:inline-block';
  el.replaceWith(d);
}

function mcIcon(name, size, extraClass) {
  var sz = size || 32;
  var cls = 'mc-icon' + (extraClass ? ' ' + extraClass : '');
  var color = MC_FALLBACK_COLORS[name] || '#7A7A7A';
  return '<img src="' + MC_ICONS[name] + '" class="' + cls + '" width="' + sz + '" height="' + sz +
    '" data-fallback="' + color + '" onerror="mcIconFallback(this)" alt="' + name + '">';
}

// ============================================================
//  TIER / XP PROGRESSION SYSTEM
// ============================================================
var TIERS = [
  { name: 'Wooden Sword',    icon: 'wooden_sword',    xp: 0,   color: '#A47834', msg: 'Starting gear!' },
  { name: 'Stone Sword',     icon: 'stone_sword',     xp: 50,  color: '#7A7A7A', msg: 'Upgraded!' },
  { name: 'Iron Sword',      icon: 'iron_sword',      xp: 150, color: '#CCCCCC', msg: 'Getting stronger!' },
  { name: 'Diamond Sword',   icon: 'diamond_sword',   xp: 350, color: '#5DE8F0', msg: 'LEGENDARY WARRIOR!' },
  { name: 'Netherite Sword', icon: 'netherite_sword',  xp: 700, color: '#555555', msg: 'ULTIMATE MASTER!' },
];

function getTotalXP() {
  try { return parseInt(localStorage.getItem("dragonwords_xp")) || 0; } catch { return 0; }
}

function addXP(n) {
  var oldXP = getTotalXP();
  var oldTier = getTierForXP(oldXP);
  var newXP = oldXP + n;
  localStorage.setItem("dragonwords_xp", newXP);
  var newTier = getTierForXP(newXP);
  if (newTier.name !== oldTier.name) {
    // Tier up! Return the new tier for animation
    return { xp: newXP, tierUp: newTier };
  }
  return { xp: newXP, tierUp: null };
}

function getTierForXP(xp) {
  var tier = TIERS[0];
  for (var i = TIERS.length - 1; i >= 0; i--) {
    if (xp >= TIERS[i].xp) { tier = TIERS[i]; break; }
  }
  return tier;
}

function getTierIndex(xp) {
  for (var i = TIERS.length - 1; i >= 0; i--) {
    if (xp >= TIERS[i].xp) return i;
  }
  return 0;
}

function getXPProgressToNextTier(xp) {
  var idx = getTierIndex(xp);
  if (idx >= TIERS.length - 1) return { pct: 100, current: xp, needed: TIERS[idx].xp, next: null };
  var current = xp - TIERS[idx].xp;
  var needed = TIERS[idx + 1].xp - TIERS[idx].xp;
  return { pct: Math.min(100, Math.round((current / needed) * 100)), current: current, needed: needed, next: TIERS[idx + 1] };
}

// Legacy compat: keep getTotalDiamonds/addDiamonds wrappers pointing to XP
function getTotalDiamonds() { return getTotalXP(); }
function addDiamonds(n) { return addXP(n); }

// ============================================================
//  ACHIEVEMENTS
// ============================================================
var ACHIEVEMENTS_KEY = 'dragonwords_achievements';

function getAchievements() {
  try { return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY)) || {}; } catch { return {}; }
}

function unlockAchievement(id) {
  var ach = getAchievements();
  if (ach[id]) return false; // already unlocked
  ach[id] = Date.now();
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(ach));
  return true; // newly unlocked
}

function hasAchievement(id) {
  return !!getAchievements()[id];
}

// --- localStorage Progress ---
var STORAGE_KEY = "dragonwords_progress";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getWordProgress(chinese) {
  const prog = loadProgress();
  return prog[chinese] || { correct: 0, mastered: false, lastSeen: 0 };
}

function recordCorrect(chinese) {
  const prog = loadProgress();
  if (!prog[chinese]) prog[chinese] = { correct: 0, mastered: false, lastSeen: 0 };
  prog[chinese].correct++;
  prog[chinese].lastSeen = Date.now();
  if (prog[chinese].correct >= 3) prog[chinese].mastered = true;
  saveProgress(prog);
  return prog[chinese];
}

function recordWrong(chinese) {
  const prog = loadProgress();
  if (!prog[chinese]) prog[chinese] = { correct: 0, mastered: false, lastSeen: 0 };
  prog[chinese].lastSeen = Date.now();
  saveProgress(prog);
}

function getMasteredCount() {
  const prog = loadProgress();
  return Object.values(prog).filter(p => p.mastered).length;
}

// --- Spaced Repetition Light ---
function buildSessionQueue(words) {
  const prog = loadProgress();
  const unmastered = words.filter(w => { const p = prog[w.chinese]; return !p || !p.mastered; });
  const mastered = words.filter(w => { const p = prog[w.chinese]; return p && p.mastered; });

  let queue = [];
  const batchSize = 10;
  const unmasteredMastered = unmastered.filter(w => { const p = prog[w.chinese]; return p && p.correct >= 2; });
  const batchReady = unmasteredMastered.length / Math.min(batchSize, unmastered.length) >= 0.7;

  let currentBatch;
  if (batchReady && unmastered.length > batchSize) {
    currentBatch = unmastered.slice(0, batchSize * 2);
  } else {
    currentBatch = unmastered.slice(0, batchSize);
  }

  let masteredIdx = 0;
  for (let i = 0; i < currentBatch.length; i++) {
    queue.push(currentBatch[i]);
    if ((i + 1) % 4 === 0 && mastered.length > 0) {
      queue.push(mastered[masteredIdx % mastered.length]);
      masteredIdx++;
    }
  }

  if (queue.length === 0) {
    queue = shuffleArray([...mastered]).slice(0, 15);
  }

  return shuffleArray(queue);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- TTS ---
var ttsReady = false;
var ttsVoice = null;

function initTTS() {
  const synth = window.speechSynthesis;
  function findVoice() {
    const voices = synth.getVoices();
    ttsVoice = voices.find(v => v.lang === 'zh-CN') ||
               voices.find(v => v.lang.startsWith('zh')) || null;
    ttsReady = true;
  }
  if (synth.getVoices().length > 0) findVoice();
  synth.addEventListener('voiceschanged', findVoice);
}

function speakChinese(text) {
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.85;
  utterance.pitch = 1.0;
  if (ttsVoice) utterance.voice = ttsVoice;
  synth.speak(utterance);
  return utterance;
}

// --- Pinyin matching ---
function normalizePinyin(str) {
  return str.toLowerCase().trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ');
}

function pinyinExactMatch(input, target) {
  return input.trim().toLowerCase() === target.trim().toLowerCase();
}

function pinyinLooseMatch(input, target) {
  return normalizePinyin(input) === normalizePinyin(target);
}

//xu ly hinh anh sang mang
// const productsToInsert = productsData.map((product) => {
//   // Xử lý trường image: đảm bảo luôn là mảng
//   let images = [];
//   if (Array.isArray(product.image)) {
//     images = product.image;
//   } else if (typeof product.image === "string") {
//     images = [product.image];
//   }
// });

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/Category");
const SubCategory = require("./models/SubCategory");
const Product = require("./models/Product");
const Post = require("./models/Post");
const Order = require("./models/Order");
const Brand = require("./models/Brand");

// Load biến môi trường từ file `.env`
dotenv.config();

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Dữ liệu mẫu
const brandsData = [
  { name: "MegaHouse", slug: "mega-house" },
  { name: "ArtSpirit", slug: "art-spirit" },
  { name: "Bandai", slug: "bandai" },
  { name: "Max Factory", slug: "max-factory" },
  { name: "Metal Build", slug: "metal-build" },
  { name: "18k Super", slug: "18k-super" },
];
const categoriesData = [
  { slug: "figure", name: "Mô hình trưng bày" },
  { slug: "assemble", name: "Mô Hình lắp ráp" },
  { slug: "assemble-tool", name: "Dụng cụ lắp ráp" },
];

const subCategoriesData = [
  { name: "Mô hình OnePiece", slug: "onepiece-figure", category: "figure" },
  { name: "Mô hình Anime", slug: "anime-figure", category: "figure" },
  { name: "Mô hình Marvel", slug: "marvel-figure", category: "figure" },
  { name: "Mô Hình Pokemon", slug: "pokemon-figure", category: "figure" },
  { name: "Mô Hình Phương tiện", slug: "vehicle-figure", category: "figure" },
  { name: "Mô Hình Quân sự", slug: "army-figure", category: "figure" },
  { name: "Mô Hình Súng", slug: "gun-figure", category: "figure" },
  { name: "Mô Hình Động vật", slug: "animal-figure", category: "figure" },
  { name: "Mô Hình Giá rẻ", slug: "cheap-figure", category: "figure" },

  { name: "Mô hình Gundam", slug: "gundam-assemble", category: "assemble" },
  { name: "Mô hình 3D", slug: "3d-assemble", category: "assemble" },
  { name: "Mô hình Nhựa", slug: "plastic-assemble", category: "assemble" },
  { name: "Mô hình Giấy", slug: "paper-assemble", category: "assemble" },
  { name: "Mô hình Gỗ", slug: "wood-assemble", category: "assemble" },
  { name: "Mô hình Kim loại", slug: "metal-assemble", category: "assemble" },
  { name: "Mô hình Giá rẻ", slug: "cheap-assemble", category: "assemble" },

  { name: "Dụng cụ lắp ráp", slug: "assemble-tool", category: "assemble-tool" },
];

const productsData = [
  {
    productId: "OP002",
    name: "Mô hình Zoro OP002",
    slug: "mo-hinh-zoro",
    price: 150000,
    stock: 8,
    difficulty: 2,
    pieces: 90,
    width: 18,
    height: 25,
    length: 15,
    video: "-nuiezt1knE",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô hình OnePiece", "Mô hình Anime"],
    description: "Tượng nhân vật Zoro với kiếm ba thanh.",
    image: [
      "https://jola.vn/cdn/720/Product/tiKOMCIWN/o1cn01upr7bc2ltrjwdc9cw-2211283779693-0-cib.jpg",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/513/283/products/7fb5d49a-176b-44c3-bb19-1bd17f754187-1714041578668.jpg?v=1714041585540",
      "https://static.oreka.vn/800-800_d59ac14c-8b27-40db-974e-eacbe70b67af",
      "https://dinotoystore.vn/wp-content/uploads/2023/12/O1CN019vjesz22OtKZPCBAs_2487977111-1.jpg",
    ],
  },
  {
    productId: "OP003",
    name: "Mô hình Sanji OP003",
    slug: "mo-hinh-sanji",
    price: 180000,
    stock: 7,
    difficulty: 1,
    pieces: 80,
    width: 17,
    height: 22,
    length: 16,
    video: "1uAIkIGB3Gw",
    categorySlug: "figure",
    brandName: "MegaHouse",
    subCategoryName: ["Mô hình OnePiece", "Mô hình Anime"],
    description: "Tượng nhân vật Sanji với tư thế đá.",
    image: [
      "https://mohinhfigure.com/wp-content/uploads/2023/09/mo-hinh-sanji-trang-thai-chien-dau-sieu-dep-cao-35cm-nang-1kg-box-mau-8.jpg",
      "https://salt.tikicdn.com/cache/w1200/ts/product/cd/2b/f8/8df72a5ee18f8a83f5022b5108615843.png",
      "https://product.hstatic.net/1000387428/product/anh_dai_dien_nha-05_1523d4124a724d0889fd5a63457c74b3_master.jpg",
      "https://bizweb.dktcdn.net/100/418/981/products/21-c4c28cfe-359f-4ed7-84bf-4dd04e220ada.png?v=1649148756047",
    ],
  },
  {
    productId: "GD002",
    name: "Mô Hình Gundam Wing Zero GD002",
    slug: "mo-hinh-gundam-wing-zero",
    price: 250000,
    stock: 4,
    difficulty: 4,
    pieces: 120,
    width: 22,
    height: 25,
    length: 18,
    video: "aBIacmIZ4OI",
    categorySlug: "assemble",
    brandName: "ArtSpirit",
    subCategoryName: ["Mô hình Gundam", "Mô hình Nhựa"],
    description: "Mô hình lắp ráp Gundam Wing Zero Custom.",
    image: [
      "https://file.hstatic.net/1000231532/file/wing_gundam_zero_ew_rg__1144_vietnam_grande.jpg",
      "https://product.hstatic.net/200000326537/product/rg-wing_gundam-7_6a0fb583de2d4feeb933fedaeee0f767_grande.jpg",
      "https://bizweb.dktcdn.net/100/418/981/products/z4575363559450-55abfeeaa8c885737f54de0ec59ea9f6.jpg?v=1743068810470",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/387/684/products/bann16746-3-result.png?v=1643714636797",
    ],
  },
  {
    productId: "VF001",
    name: "Mô hình lắp ráp xe Lamborghini Veneno",
    slug: "mo-hinh-xe-lamborghini-veneno",
    price: 650000,
    stock: 8,
    difficulty: 8,
    pieces: 320,
    width: 20,
    height: 15,
    length: 30,
    video: "mHKHvJYzTw8",
    categorySlug: "assemble",
    brandName: "ArtSpirit",
    subCategoryName: ["Mô hình Phương tiện", "Mô hình Nhựa"],
    description: "Mô hình lắp ráp xe Lamborghini Veneno.",
    image: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT414zdzdAfvjknsubie-X9CJTNRco8Tj9ce-crjh9R7aDByHAopxE2P1Dk2_TAf7eVJBQ&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPrUOPm3WnDU41ABB7FAt2Mzmckj7HWyqo5HrIHZU3IzhyRLgwp76DA4IM13r34Ocedc&usqp=CAU",
      "https://bizweb.dktcdn.net/100/509/307/products/441885573-1501579787106845-6357646540177046953-n.jpg?v=1716483192090",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7qJgT1Qp6oSdO-jA4kmwSSaiEMFJ65VqqNgo7bte1QckY8yqOkE3NXqM6GwwOnnBMbes&usqp=CAU",
    ],
  },
  {
    productId: "GD003",
    name: "Mô Hình Gundam Deathscythe GD003",
    slug: "mo-hinh-gundam-deathscythe",
    price: 259000,
    stock: 6,
    difficulty: 3,
    pieces: 110,
    width: 21,
    height: 23,
    length: 19,
    video: "1nUxcssI9l4",
    categorySlug: "assemble",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Gundam", "Mô hình Nhựa"],
    description: "Mô hình lắp ráp Gundam Deathscythe Hell.",
    image: [
      "https://hanoicomputercdn.com/media/product/74403_mo_hinh_lap_rap_bandai_gundam_deathscythe_hg_ac_1_144_1.jpg",
      "https://bizweb.dktcdn.net/100/418/981/products/z4521183522435-8e6f52b5f65e7179b083ad2ef3d718f4-1689697632223.jpg?v=1689698308793",
      "https://vn-test-11.slatic.net/p/4/mo-hinh-lap-rap-gundam-deathscythe-hell-custom-hg-1144-7895-49336851-79955fa43fe39dda38e1cb567416998f.jpg",
      "https://bizweb.dktcdn.net/100/451/227/products/mg-deathscythe-hell-ew-02-1742142571144.jpg?v=1742142602757",
    ],
  },
  {
    productId: "MT005",
    name: "Mô Hình Kim Loại Tàu Going Merry MT005",
    slug: "mo-hinh-kim-loai-going-merry",
    price: 250000,
    stock: 3,
    difficulty: 4,
    pieces: 150,
    width: 25,
    height: 15,
    length: 30,
    video: "72nvxZN0uOI",
    categorySlug: "assemble",
    brandName: "Metal Build",
    subCategoryName: [
      "Mô hình Kim loại",
      "Mô hình Phương tiện",
      "Mô hình OnePiece",
    ],
    description: "Mô hình lắp ráp kim loại tàu Going Merry từ One Piece.",
    image: [
      "https://down-vn.img.susercontent.com/file/6e658666d285213b1952cad8e427f058",
      "https://salt.tikicdn.com/ts/product/32/c8/31/db2a3f9915460f3d35d8715de7c766bd.jpg",
      "https://bizweb.dktcdn.net/thumb/large/100/479/026/products/8a95b47a-4ca0-4d71-8f6f-9e6d387145cc.jpg?v=1681039161113",
      "https://product.hstatic.net/200000417685/product/o1cn01jh8erv21rsovbsciu___3322127038-0-cib_4d3b7bd93b9c4d1cb0a0b116b6a2ed6c_master.jpg",
    ],
  },
  {
    productId: "DC003",
    name: "Kéo Cắt Tỉa DC003",
    slug: "keo-cat-tia",
    price: 25000,
    stock: 15,
    difficulty: 0,
    pieces: 0,
    width: 0,
    height: 0,
    length: 0,
    video: "xf2gfvx6ccY",
    categorySlug: "assemble-tool",
    brandName: "Square Enix",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description: "Kéo cắt tỉa chuyên dụng cho mô hình.",
    image: [
      "https://product.hstatic.net/1000269461/product/keo-sk5_428bc09f73a64af9b9c8c50ab063c9a2.jpg",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/400/593/products/5b1a0c7fe72a1a74433b.jpg?v=1604636247357",
      "https://bizweb.dktcdn.net/thumb/grande/100/351/215/products/keo-cat-tia-total-tht0109-8-1540468287.jpg?v=1684465974653",
      "https://fact-depot.com/tmp/cache/images/_thumbs/720x720/media/product_images/Fact-Depot-keo-cat-tia-cay-canh-hang-rao-co-rang-cua-barnel-b1010l.jpg",
    ],
  },
  {
    productId: "OP004",
    name: "Mô hình Nami OP004",
    slug: "mo-hinh-nami",
    price: 120000,
    stock: 9,
    difficulty: 1,
    pieces: 70,
    width: 16,
    height: 20,
    length: 14,
    video: "pZzTvnchfNM",
    categorySlug: "figure",
    brandName: "Max Factory",
    subCategoryName: ["Mô hình OnePiece", "Mô hình Anime"],
    description: "Tượng nhân vật Nami với bản đồ thế giới.",
    image: [
      "https://bizweb.dktcdn.net/100/418/981/products/z4414390474369-b685af5eb12944a1a4ef6576d1c551e1.jpg?v=1686285901107",
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyfzfs60x8i5dc",
      "https://product.hstatic.net/200000838897/product/upload_27dc7314c5454af889cf163deeefbf4b_master.jpg",
      "https://mohinhfigure.com/wp-content/uploads/2023/10/mo-hinh-nami-cam-gay-cao-40cm-nang-850gram-co-hop-dep-7.jpg",
    ],
  },
  {
    productId: "DB001",
    name: "Mô hình Goku Super Saiyan DB001",
    slug: "mo-hinh-goku-super-saiyan",
    price: 250000,
    stock: 7,
    difficulty: 2,
    pieces: 95,
    width: 19,
    height: 24,
    length: 17,
    video: "G7uzMm8dOGw",
    categorySlug: "figure",
    brandName: "Max Factory",
    subCategoryName: ["Mô hình Giá rẻ", "Mô hình Anime"],
    description: "Tượng nhân vật Goku ở trạng thái Super Saiyan.",
    image: [
      "https://content.pancake.vn/1/s1400x1400/1f/38/b3/89/e6072f997f13dcfcdb525b267e4f8b1b9e8f7d4d05d2fcd65b674c20.jpg",
      "https://down-vn.img.susercontent.com/file/83c01ad5427a6f60d4a3c883b6e3e45b",
      "https://cipershop.com/public/userfiles/images/do-choi-mo-hinh/Dragon-ball/goku-ss3/mo-hinh-super-daiyan-3.jpg",
      "https://mohinhfigure.com/wp-content/uploads/2024/04/z4881887161970-21364ab163e563bd31fe4dd80a0c512d.jpg",
    ],
  },
  {
    productId: "DB002",
    name: "Mô hình Vegeta DB002",
    slug: "mo-hinh-vegeta",
    price: 220000,
    stock: 6,
    difficulty: 2,
    pieces: 90,
    width: 18,
    height: 23,
    length: 16,
    video: "bZmWFGwz9Iw",
    categorySlug: "figure",
    brandName: "Max Factory",
    subCategoryName: ["Mô hình Nhựa", "Mô hình Anime"],
    description: "Tượng nhân vật Vegeta với tư thế chiến đấu.",
    image: [
      "https://bizweb.dktcdn.net/100/418/981/products/z4304716631700-04756a1d309d3980edfaaa9f378cc740-1682999560339.jpg?v=1682999562973",
      "https://d3hr4eej8cfgwy.cloudfront.net/finan-prd/c614b04f-2da6-480d-aa10-15ca8f26af77/image/6ef76550-8e1c-4f10-b37f-0f1da95b9a45.jpeg",
      "https://danfigure.vn/wp-content/uploads/2024/08/vn-11134207-7r98o-lz0lugb5zk25e6.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHYyCt5hHAXl87Fc7CGuUDOQW4vOeCK48bA&s",
    ],
  },
  {
    productId: "MT006",
    name: "Mô Hình Kim Loại Xe Tăng MT006",
    slug: "mo-hinh-kim-loai-xe-tang",
    price: 90000,
    stock: 4,
    dificulty: 3,
    pieces: 130,
    width: 22,
    height: 12,
    length: 28,
    video: "rleazmzp-g4",
    categorySlug: "assemble",
    brandName: "Metal Build",
    subCategoryName: [
      "Mô hình Kim loại",
      "Mô hình Phương tiện",
      "Mô hình Quân sự",
    ],
    description: "Mô hình lắp ráp kim loại xe tăng chiến đấu.",
    image: [
      "https://tamiyavietnam.vn/userdata/8055/wp-content/uploads/2021/04/35156-1.png",
      "https://mohinhliti.com/wp-content/uploads/2018/10/mo-hinh-xe-tang-bang-go-600x450.jpg",
      "https://www.mykingdom.com.vn/cdn/shop/files/xe-tang-chien-dau-siku-8312_2.png?v=1733297348",
      "https://product.hstatic.net/200000417685/product/mo-hinh-kim-loai-lap-rap-3d-piececool-xe-tang-t-90a-mp100-3_dfb0a53cc3214b1e9ce2a0ae56d5055f_master.jpg",
    ],
  },
  {
    productId: "DC004",
    name: "Bộ Tuốc Nơ Vít DC004",
    slug: "bo-tuoc-no-vit",
    price: 35000,
    stock: 12,
    dificulty: 0,
    pieces: 0,
    width: 0,
    height: 0,
    length: 0,
    video: "v5GOZ7Zz7K4",
    categorySlug: "assemble-tool",
    brandName: "18k Super",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description: "Bộ tuốc nơ vít đa năng cho mô hình.",
    image: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa_lMiDnzK_-USgNFTmbi3JgQNFGi9TXlWFg&s",
      "https://www.ketnoitieudung.vn/data/bt4/bo-tua-vit-11-chi-tiet-kingtony-32518mr.jpg",
      "https://sieuthithietbi.com/products/bo-tuoc-no-vit-dep-va-bake-8-cay-stanley-stmt66673.jpg",
      "https://fabina.com.vn/library/module_new/bo-tua-vit-cach-dien-6-chi-tiet-wiha-38362_s2969.png",
    ],
  },
  {
    productId: "DS001",
    name: "Mô Hình Doraemon DS001",
    slug: "figure-doraemon",
    price: 180000,
    stock: 10,
    dificulty: 1,
    pieces: 60,
    width: 15,
    height: 18,
    length: 15,
    video: "qC0a9lgEibI",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô hình 3D", "Mô hình Anime"],
    description: "Tượng nhân vật Doraemon dễ thương.",
    image: [
      "https://bizweb.dktcdn.net/thumb/grande/100/342/840/products/a1a-0727bcd5-1d8f-4425-b25f-3abe26510d2a.jpg?v=1658399763107",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4tcmY53ol8ga5IgFrZj9wt40fyGXljV2rQ&s",
      "https://vn-test-11.slatic.net/p/f66900ee4815254f07e15cafc84d7a52.jpg",
      "https://hobiverse.com.vn/cdn/shop/files/mo-hinh-doraemon-take-a-break-52toys-6958985023474_979b18d3-b360-486e-9a91-7cba17b09778.jpg?v=1742131253",
    ],
  },
  {
    productId: "DS002",
    name: "Mô Hình Nobita DS002",
    slug: "figure-nobita",
    price: 149000,
    stock: 8,
    dificulty: 1,
    pieces: 55,
    width: 14,
    height: 17,
    length: 14,
    video: "sAyG9002fOY",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Kim loại", "Mô hình Anime"],
    description: "Tượng nhân vật Nobita với vẻ mặt hài hước.",
    image: [
      "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lu963umhzy419a",
      "https://herogame.vn/ad-min/assets/js/libs/kcfinder/upload_resource/images/mo-hinh-doraemon-udf-nobita-fdrm024-1.jpg",
      "https://herogame.vn/ad-min/assets/js/libs/kcfinder/upload_img2/images/Vinh/Aug/mo-hinh-doraemon-udf-nobita-2.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8iaVkNTL6BjFu8EHN23KD1vx08rRBDFoLPQ&s",
    ],
  },
  {
    productId: "GD004",
    name: "Mô Hình Gundam Barbatos GD004",
    slug: "mo-hinh-gundam-barbatos",
    price: 290000,
    stock: 3,
    dificulty: 4,
    pieces: 140,
    width: 24,
    height: 26,
    length: 20,
    video: "E-ECFlSf0mg",
    categorySlug: "assemble",
    brandName: "ArtSpirit",
    subCategoryName: ["Mô hình Gundam", "Mô hình Nhựa"],
    description: "Mô hình lắp ráp Gundam Barbatos Lupus Rex.",
    image: [
      "https://product.hstatic.net/1000231532/product/am_shop_ban_gundam_barbatos_mg_dc6d9eeecafa4257980f239c863d2c55_grande_29336552c6564e718c1b1d7cc1c04a08_master.jpg",
      "https://file.hstatic.net/1000231532/file/gundam_barbatos_hg__1144_grande.jpg",
      "https://gundamshop.vn/wp-content/uploads/2022/05/b150118eb21b354fa8274f717eede5fc.jpg",
      "https://bizweb.dktcdn.net/100/442/971/products/download-2024-07-12t152050-507-1720772584319.jpg?v=1720772614367",
    ],
  },
  {
    productId: "MT007",
    name: "Mô Hình Kim Loại Máy Bay MT007",
    slug: "mo-hinh-kim-loai-may-bay",
    price: 280000,
    stock: 5,
    dificulty: 3,
    pieces: 120,
    width: 30,
    height: 10,
    length: 25,
    video: "WMgrF_qSngw",
    categorySlug: "assemble",
    brandName: "Metal Build",
    subCategoryName: ["Mô hình Kim loại", "Mô hình Phương tiện"],
    description: "Mô hình lắp ráp kim loại máy bay chiến đấu.",
    image: [
      "https://xemohinh.co/media/May-bay-chien-dau-J17_4529.jpg",
      "https://xemohinh.hcm.ss.bfcplatform.vn/xe_mo_hinh_kim_loai_blue-3261.jpg",
      "https://i.ytimg.com/vi/P-0bfP2RJ8E/maxresdefault.jpg",
      "https://lh3.googleusercontent.com/proxy/s2thcKq_vyJ47sX2f4vdrYUc6b0nGjXLHgT5aXGDenxOZ6UXNga9qJuygYrmStzqj6F1b5CTal6Q2W7g51fT22CNWiiGEKTr_fUpz7zvF66Y6O5eUbXUbLUliV6iv2I",
    ],
  },
  {
    productId: "DC005",
    name: "Bộ Dụng Cụ Đa Năng DC005",
    slug: "bo-dung-cu-da-nang",
    price: 100000,
    stock: 7,
    dificulty: 0,
    pieces: 0,
    width: 0,
    height: 0,
    length: 0,
    video: "mqQLNHeq1dY",
    categorySlug: "assemble-tool",
    brandName: "18k Super",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description: "Bộ dụng cụ đa năng cho người chơi mô hình.",
    image: [
      "https://dewaltvietnam.com/wp-content/uploads/2020/07/STMT81243-840.jpg",
      "https://cuahangbosch.com/wp-content/uploads/2021/10/bo-dung-cu-108-mon-bosch-tien-dung-trong-cong-viec.jpg",
      "https://file.hstatic.net/200000033050/file/dung-cu-cam-tay-da-nang-35-mon_ec6eb83612034110a1a2048bc2998b9e_grande.jpg",
      "https://thietbi247.vn/vnt_upload/product/Tone/bo-dung-cu-sua-chua-da-nang-cua-nhat-53-chi-tiet-tss4331-tone_1.jpg",
    ],
  },
  {
    productId: "OP005",
    name: "Mô hình Chopper OP005",
    slug: "figure-chopper",
    price: 99000,
    stock: 8,
    dificulty: 1,
    pieces: 65,
    width: 14,
    height: 16,
    length: 14,
    video: "KhLgAWgrVEY",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô hình OnePiece", "Mô hình Anime"],
    description: "Tượng nhân vật Tony Tony Chopper dễ thương.",
    image: [
      "https://bizweb.dktcdn.net/thumb/grande/100/418/981/products/2-10dc5dde-1dce-49dd-a81b-636a2ba9ac8d.png?v=1651724943527",
      "https://khomohinh.com/wp-content/uploads/2022/09/mo-hinh-chopper-dang-chien-dau-co-lon-pvc-23cm-anime-one-piece-1.jpg",
      "https://img.lazcdn.com/g/p/cbccfc885b5f5f7480ee6f4e0642f614.jpg_720x720q80.jpg",
      "https://cipershop.com/public/userfiles/products/mo-hinh-chopper-mo-hinh-one-piece-8.webp",
    ],
  },
  {
    productId: "GD005",
    name: "Mô Hình Gundam Exia GD005",
    slug: "mo-hinh-gundam-exia",
    price: 120000,
    stock: 4,
    dificulty: 3,
    pieces: 125,
    width: 23,
    height: 24,
    length: 19,
    video: "2XnAEyQLxdQ",
    categorySlug: "assemble",
    brandName: "ArtSpirit",
    subCategoryName: ["Mô hình Gundam", "Mô hình Kim loại"],
    description: "Mô hình lắp ráp Gundam Exia Repair.",
    image: [
      "https://bizweb.dktcdn.net/100/418/981/products/1-4403d61b-73ce-4da2-94ce-6857204a61e7.jpg?v=1742614586220",
      "https://file.hstatic.net/1000231532/file/gundam_exia_rg__1144_vietnam_grande.jpg",
      "https://bizweb.dktcdn.net/100/342/840/products/a4-a62b8eda-4965-43a6-9bca-db2f557a6a5a.jpg?v=1653468839097",
      "https://azgundam.com/wp-content/uploads/2018/09/SD-EX-003-GUNDAM-EXIA-2.jpg",
    ],
  },
  {
    productId: "MT008",
    name: "Mô Hình Kim Loại Tòa Nhà MT008",
    slug: "mo-hinh-kim-loai-toa-nha",
    price: 49000,
    stock: 6,
    dificulty: 4,
    pieces: 160,
    width: 28,
    height: 35,
    length: 25,
    video: "Fd9EBvcjZTY",
    categorySlug: "assemble",
    brandName: "Metal Build",
    subCategoryName: ["Mô hình Kim loại", "Mô hình 3D"],
    description: "Mô hình lắp ráp kim loại tòa nhà hiện đại.",
    image: [
      "https://chipn24.com/files/sanpham/143/1/jpg/mo-hinh-toa-cao-oc-empire-states-my-1m.jpg",
      "https://shopquatructuyen.com/wp-content/uploads/2019/04/mo-hinh-toa-nha-empire-state-600x600.jpg",
      "https://kit168.com/wp-content/uploads/2018/01/tokyo-metropolitan-government-building-mini-kit168.com_.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQt6imHOId4VHdLhOpdjwilc8pdizF1MhqWA&s",
    ],
  },
  {
    productId: "DC006",
    name: "Keo Dán Mô Hình DC006",
    slug: "keo-dan-mo-hinh",
    price: 20000,
    stock: 20,
    dificulty: 0,
    pieces: 0,
    width: 0,
    height: 0,
    length: 0,
    video: "Wzk12NRp9Go",
    categorySlug: "assemble-tool",
    brandName: "18k Super",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description: "Keo dán chuyên dụng cho mô hình nhựa và kim loại.",
    image: [
      "https://tamiyavietnam.vn/userdata/8055/wp-content/uploads/2021/04/87038-1-copy.png",
      "https://product.hstatic.net/1000387428/product/img_6336_00000_addc6ee61f16487289619b2c1822a526.jpg",
      "https://file.hstatic.net/1000231532/file/keo_dan_mo_hinh_nhua_qw_model_cement_extra_thin_45ml.jpg",
      "https://product.hstatic.net/1000231532/product/keo_dan_gundam_tamiya_extra_thin_cement_727920c3e59146adbd0392cf775b8c1b.jpg",
    ],
  },
  {
    productId: "DB003",
    name: "Mô hình Goku Ultra Instinct DB003",
    slug: "figure-goku-ultra-instinct",
    price: 249000,
    stock: 5,
    dificulty: 3,
    pieces: 110,
    width: 20,
    height: 26,
    length: 18,
    video: "AvREFTk0Bgs",
    categorySlug: "figure",
    brandName: "Max Factory",
    subCategoryName: ["Mô hình Nhựa", "Mô hình Anime"],
    description: "Tượng nhân vật Goku ở trạng thái Ultra Instinct.",
    image: [
      "https://content.pancake.vn/1/s1400x1400/e5/36/e8/c7/ccd6336fb507c20f54866b92840b2ed400acb0e1bdbfca87f7142709.jpg",
      "https://bizweb.dktcdn.net/thumb/large/100/479/026/products/6b67ec081b0e2e75729fa9a91f44dc58-1680523633287.jpg?v=1680523639280",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3l9dIuth-ko5jXero_phPz7kwj2m3uwQoYg&s",
      "https://xuhishop.vn/upload/products/8221621310652_xuhi//goku-2.jpeg",
    ],
  },
  {
    productId: "GD006",
    name: "Mô Hình Gundam Unicorn GD006",
    slug: "mo-hinh-gundam-unicorn",
    price: 209000,
    stock: 2,
    dificulty: 5,
    pieces: 180,
    width: 26,
    height: 28,
    length: 22,
    video: "ZUjBmUC_sJc",
    categorySlug: "assemble",
    brandName: "Square Enix",
    subCategoryName: ["Mô hình Gundam", "Mô hình Giá rẻ"],
    description: "Mô hình lắp ráp Gundam Unicorn Destroy Mode.",
    image: [
      "https://i0.wp.com/mechashark.vn/wp-content/uploads/2023/12/kiotviet_186566f23c781044659c71f5f521bcb0.jpg?fit=600%2C600&ssl=1",
      "https://bizweb.dktcdn.net/100/442/971/products/download-2024-07-13t204857-613-1720879078659.jpg?v=1720879083390",
      "https://bizweb.dktcdn.net/thumb/large/100/479/026/products/vn-11134207-7r98o-lowlli624ytq5d-1701780933286.jpg?v=1701780940787",
      "https://product.hstatic.net/200000326537/product/244020361_4326290964129518_929788380783049074_n_f7e9169ea764410dbba98f80090a5c83_master.jpg",
    ],
  },
  {
    productId: "MT009",
    name: "Mô Hình Kim Loại Cầu Tháp MT009",
    slug: "mo-hinh-kim-loai-cau-thap",
    price: 129000,
    stock: 4,
    dificulty: 4,
    pieces: 170,
    width: 32,
    height: 20,
    length: 40,
    video: "y7lHWviLI1I",
    categorySlug: "assemble",
    brandName: "Metal Build",
    subCategoryName: ["Mô hình Kim loại", "Mô hình 3D"],
    description: "Mô hình lắp ráp kim loại cầu tháp nổi tiếng.",
    image: [
      "https://www.tamshoppe.vn/Thumb/Web/Resources/Uploaded/2/images/san-pham/Tong-hop/mo-hinh-cau-thap-london-the-tower-bridge-2_w800_h600.jpeg",
      "https://admin.tamshoppe.vn/Web/Resources/Uploaded/2/images/san-pham/Tong-hop/mo-hinh-cau-thap-london-the-tower-bridge-1.jpeg",
      "https://down-vn.img.susercontent.com/file/sg-11134201-22100-19g299u8n6iv84",
      "https://tayta.com.vn/upload/images/_DSC8991.jpg",
    ],
  },
  {
    productId: "DC007",
    name: "Bút Vẽ Chi Tiết DC007",
    slug: "but-ve-chi-tiet",
    price: 30000,
    stock: 15,
    dificulty: 0,
    pieces: 0,
    width: 0,
    height: 0,
    length: 0,
    video: "HvfKjvXJaiY",
    categorySlug: "assemble-tool",
    brandName: "18k Super",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description: "Bút vẽ chi tiết cho mô hình.",
    image: [
      "https://angelus.com.vn/wp-content/uploads/2020/04/B%E1%BB%99-c%E1%BB%8D-v%E1%BA%BD-chi-ti%E1%BA%BFt-nh%E1%BB%8F-Angelus-Micro-Detail-Paint-Brush-1.jpg",
      "https://artstore.com.vn/wp-content/uploads/2018/04/B%C3%BAt-v%E1%BA%BD-k%E1%BB%B9-thu%E1%BA%ADt-Uni-Pin-3.jpg",
      "https://down-vn.img.susercontent.com/file/c91e702d90b49a59a74d1f034272b923",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkA994oShHS5VMiUBNg-Yd39PG5fWtWuQeRQ&s",
    ],
  },
  {
    productId: "OP006",
    name: "Mô hình Robin OP006",
    slug: "figure-robin",
    price: 169000,
    stock: 7,
    dificulty: 2,
    pieces: 85,
    width: 17,
    height: 21,
    length: 15,
    video: "0zMORy5EEhA",
    categorySlug: "figure",
    brandName: "Max Factory",
    subCategoryName: ["Mô hình OnePiece", "Mô hình Anime"],
    description: "Tượng nhân vật Nico Robin với sách lịch sử.",
    image: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlm1121hCjfejIIBtyhvzzDZA4IqZCLhUEmA&s",
      "https://dinotoystore.vn/wp-content/uploads/2024/02/O1CN01aHIPHq22OtLaEsxh8_2487977111.jpg",
      "https://down-vn.img.susercontent.com/file/b7f456a50c9927e87c933a1a2f6214ad",
      "https://statics.pancake.vn/web-media/3f/e1/a8/99/d98e4480cca5a508b28c9c89da2da1152b39f07b76b0853047cffa0d.jpeg",
    ],
  },
  {
    productId: "GD007",
    name: "Mô Hình Gundam Freedom GD007",
    slug: "mo-hinh-gundam-freedom",
    price: 290000,
    stock: 3,
    difficulty: 4,
    pieces: 150,
    width: 25,
    height: 27,
    length: 21,
    video: "unlfy65uXIo",
    categorySlug: "assemble",
    brandName: "Square Enix",
    subCategoryName: ["Mô hình Gundam", "Mô hình Kim loại"],
    description: "Mô hình lắp ráp Gundam Freedom Strike.",
    image: [
      "https://bizweb.dktcdn.net/100/299/021/products/455034.jpg?v=1716452478440",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/412/141/products/m1.jpg?v=1681056071257",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/299/021/products/455031.jpg?v=1716452298190",
      "https://bizweb.dktcdn.net/100/418/981/products/z4649923763500-925c62dee83feafec9ca2a7bbcbcdea7.jpg?v=1743068787080",
    ],
  },
  {
    productId: "MT010",
    name: "Mô Hình Kim Loại Tàu Titanic MT010",
    slug: "mo-hinh-kim-loai-titanic",
    price: 210000,
    stock: 3,
    difficulty: 5,
    pieces: 200,
    width: 40,
    height: 15,
    length: 50,
    video: "XsWRDPGRCR4",
    categorySlug: "assemble",
    brandName: "Square Enix",
    subCategoryName: ["Mô hình Kim loại", "Mô hình Giá rẻ"],
    description: "Mô hình lắp ráp kim loại tàu Titanic nổi tiếng.",
    image: [
      "https://tauthuyenmohinh.com/www/uploads/images/san-pham/tau-mo-hinh/mo-hinh-thuyen-titanic-full_compressed.jpg",
      "https://tauthuyenmohinh.com/www/uploads/images/san-pham/tau-mo-hinh/mo-hinh-thuyen-titanic-40cm_compressed.jpg",
      "https://tauthuyenmohinh.com/www/uploads/images/san-pham/du-thuyen/Thuyen-Titanic-2.jpg",
      "https://i.ex-cdn.com/vntravellive.com/files/news/2021/10/12/mo-hinh-lego-titanic-lon-nhat-vua-duoc-ra-mat-110541.jpg",
    ],
  },
  {
    productId: "DC008",
    name: "Máy Khoan Mini DC008",
    slug: "may-khoan-mini",
    price: 219000,
    stock: 8,
    difficulty: 0,
    pieces: 0,
    width: 0,
    height: 0,
    length: 0,
    video: "juneSD1buJI",
    categorySlug: "assemble-tool",
    brandName: "Bandai",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description: "Máy khoan mini dùng cho mô hình tỉ mỉ.",
    image: [
      "https://nshopvn.com/wp-content/uploads/2023/08/anh-dai-dien-may-khoan-mai-mini-cam-tay-x32i-1.jpg",
      "https://file.hstatic.net/1000223886/file/may-khoan-mai-mini-da-nang-v5-6_33f048a60e544edba99f5f59a3f7b4b2_grande.jpg",
      "https://thietbingoinha.com/wp-content/uploads/2018/03/Ban-may-khoan-mai-khac-mini-da-nang.jpg",
      "https://sieuthithietbi.com/products/may-mai-khuon-mini-proskit-pt-5201b.jpg",
    ],
  },
  {
    productId: "DB004",
    name: "Mô hình Vegeta Blue DB004",
    slug: "mo-hinh-vegeta-blue",
    price: 290000,
    stock: 4,
    difficulty: 3,
    pieces: 105,
    width: 19,
    height: 24,
    length: 17,
    video: "vh0Uz65QqPQ",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Nhựa", "Mô hình Anime"],
    description: "Tượng nhân vật Vegeta ở trạng thái Super Saiyan Blue.",
    image: [
      "https://down-vn.img.susercontent.com/file/9b0ebc75931950ed6a34517dae179f90",
      "https://minitech.com.vn/wp-content/uploads/2023/02/Screenshot_3-9.png",
      "https://dinotoystore.vn/wp-content/uploads/2023/09/372833534_342181388156232_4650553983191820025_n.jpg",
      "https://ongcongthangstore.com/wp-content/uploads/2023/11/z4842150733631_4476ab1d025db8f73f9e9b1dbada9b6e.jpg",
    ],
  },
  {
    productId: "GD008",
    name: "Mô Hình Gundam Dynames GD008",
    slug: "mo-hinh-gundam-dynames",
    price: 290000,
    stock: 4,
    difficulty: 3,
    pieces: 130,
    width: 24,
    height: 25,
    length: 20,
    video: "sHotkVvQ6is",
    categorySlug: "assemble",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Gundam", "Mô hình Nhựa"],
    description: "Mô hình lắp ráp Gundam Dynames Sniper.",
    image: [
      "https://bizweb.dktcdn.net/thumb/large/100/479/026/products/89d81e2f-1f3b-4a73-8c21-cf4e837b02fb.jpg?v=1681283144287",
      "https://bizweb.dktcdn.net/100/418/981/products/z4979380897854-c4434a6f1189de6c71c20559b3811d79-1702735234306.jpg?v=1743068207123",
      "https://bizweb.dktcdn.net/thumb/large/100/479/026/products/3a37f0dd-06a5-426e-bc5b-475607465960.jpg?v=1681283148017",
      "https://bizweb.dktcdn.net/thumb/grande/100/334/916/products/285700883-8204815659532441-2500869603483934271-n.png?v=1658920198783",
    ],
  },
  {
    productId: "MT011",
    name: "Mô Hình Kim Loại Xe Đua MT011",
    slug: "mo-hinh-kim-loai-xe-dua",
    price: 190000,
    stock: 5,
    difficulty: 3,
    pieces: 140,
    width: 26,
    height: 10,
    length: 32,
    video: "7YiVh8a-EA0",
    categorySlug: "assemble",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Kim loại", "Mô hình 3D"],
    description: "Mô hình lắp ráp kim loại xe đua công thức 1.",
    image: [
      "https://product.hstatic.net/1000387428/product/untitled-1-01_7e01e39966fd45dfa27ffcd7b0f6786d.jpg",
      "https://xemohinh.hcm.ss.bfcplatform.vn/mo_hinh_xe_kim_loai-2439.jpg",
      "https://salt.tikicdn.com/cache/w300/ts/product/dc/84/7b/d4ba1d60b86f998bba933a06a44f3a7a.jpg",
      "https://salt.tikicdn.com/ts/product/74/00/a8/65702fffe16192729715728add738b33.jpg",
    ],
  },
  {
    productId: "DC009",
    name: "Bộ Giấy Nhám DC009",
    slug: "bo-giay-nham",
    price: 15000,
    stock: 18,
    difficulty: 0,
    pieces: 0,
    width: 0,
    height: 0,
    length: 0,
    video: "C5nSK2MK72g",
    categorySlug: "assemble-tool",
    brandName: "Bandai",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description: "Bộ giấy nhám đa năng cho mô hình.",
    image: [
      "https://bizweb.dktcdn.net/thumb/large/100/394/484/products/14b1659c28e5703f86ffcd8ea9d58a7d-1f5e7844-52ca-4892-975e-63f92dc955d6-041dcfd3-21c5-46f5-881f-af25d1ebfd22.jpg?v=1649410137620",
      "https://product.hstatic.net/200000383281/product/upload_2e4d9e6ad14d4c22918c3d8d14f261f6_master.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZhcidYetiVJQ2VJYaQZ6C0AsyujYdbdDcA&s",
      "https://dungcudonghekimsa.vn/wp-content/uploads/2024/06/Giay-Cha-Nham-Mai-Mong-240-Grit.jpg",
    ],
  },
  {
    productId: "OP007",
    name: "Mô hình Franky OP007",
    slug: "mo-hinh-franky",
    price: 120000,
    stock: 6,
    difficulty: 2,
    pieces: 95,
    width: 20,
    height: 22,
    length: 18,
    video: "6YjSupGo6nU",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô hình OnePiece", "Mô hình Anime"],
    description: "Tượng nhân vật Franky với kiểu tái SUPER.",
    image: [
      "https://dinotoystore.vn/wp-content/uploads/2023/08/2-1-1.jpg",
      "https://www.anhshop.com/wp-content/uploads/2023/05/Franky-Grandline-Men-Banpresto-One-Piece-figure.jpg",
      "https://down-vn.img.susercontent.com/file/472ab8b5304de6e2ce708d3fd43136b1",
      "https://salt.tikicdn.com/ts/product/41/b9/45/b22e965a44471cd44b34602f4476a0aa.jpg",
    ],
  },
  {
    productId: "GD009",
    name: "Mô Hình Gundam Heavyarms GD009",
    slug: "mo-hinh-gundam-heavyarms",
    price: 119000,
    stock: 3,
    difficulty: 4,
    pieces: 145,
    width: 25,
    height: 24,
    length: 22,
    video: "lsjKp3RnEZs",
    categorySlug: "assemble",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Gundam", "Mô hình Nhựa"],
    description: "Mô hình lắp ráp Gundam Heavyarms Custom.",
    image: [
      "https://hanoicomputercdn.com/media/product/74407_mo_hinh_lap_rap_bandai_gundam_heavyarms_hg_ac_1_144_1.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWZm-x4Xv9SNBZm0a_N-b7OE5ImoVxQbiSsA&s",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/442/971/products/977ebfe04e38263d18f2f9faad9c5bd4-1684084186037.jpg?v=1684109464487",
      "https://file.hstatic.net/1000231532/file/p_rap_xxxg-01h_gundam_heavyarms_gundam_03_chinh_hang_bandai_gia_re_hcm_8e921636a46b443291b68f6246ab88b8_grande.jpg",
    ],
  },
  {
    productId: "MT012",
    name: "Mô Hình Kim Loại Tàu Vũ Trụ MT012",
    slug: "mo-hinh-kim-loai-tau-vu-tru",
    price: 160000,
    stock: 2,
    difficulty: 5,
    pieces: 180,
    width: 35,
    height: 20,
    length: 45,
    video: "mLvYwPhkFwA",
    categorySlug: "assemble",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Kim loại", "Mô hình Giá rẻ", "Mô hình 3D"],
    description: "Mô hình lắp ráp kim loại tàu vũ trụ tương lai.",
    image: [
      "https://product.hstatic.net/200000417685/product/0000712_nasa-shuttle-enterprise_30ec90d89da14b82befba50728fe74fe_master.jpeg",
      "https://down-vn.img.susercontent.com/file/4d40db5a26c59d60da60df0f00e074c9",
      "https://product.hstatic.net/200000417685/product/p-tau-vu-tru-con-thoi-nasa-83014-shuttle-expedition-1230-manh-lg0083-8_41c3003e5c664901a128f6c94242d081_master.jpg",
      "https://lh5.googleusercontent.com/proxy/RqzxMkAU8WneRh9bGW2CYEz6hN1Fnhjqkj6CD4ZZKNFNDTv1kQDZv7EtmRJn__0at0yb9DV4kwA0JJ7kdLLCNEp3dFvHNEhm0eewhBaNH1QXNWNAMEaB",
    ],
  },
  {
    productId: "DC010",
    name: "Bộ Cọ Vẽ DC010",
    slug: "bo-co-ve",
    price: 80000,
    stock: 12,
    difficulty: 0,
    pieces: 0,
    width: 0,
    height: 0,
    length: 0,
    video: "-URBsfwIoho",
    categorySlug: "assemble-tool",
    brandName: "Bandai",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description: "Bộ cọ vẽ chuyên nghiệp cho mô hình.",
    image: [
      "https://product.hstatic.net/1000362139/product/deli_738856_c3b46817eb844b74b9f9dbccd4b035c0.jpg",
      "https://product.hstatic.net/1000332761/product/bo_5_cay_co_ve_1_2018_06_08_11_32_30_7c2f0ee2a77440de8e3be1942d70c4fe_master.jpg",
      "https://down-vn.img.susercontent.com/file/6115cecf54039848e7e56e474ad8ae07",
      "https://product.hstatic.net/1000174044/product/d4a6ab753871f82fa160_28221741cf904c0685a6606c50976a6a_master.jpg",
    ],
  },
  {
    productId: "DB005",
    name: "Mô hình Broly DB005",
    slug: "figure-broly",
    price: 180000,
    stock: 3,
    difficulty: 3,
    pieces: 115,
    width: 21,
    height: 27,
    length: 19,
    video: "orI1rRFnr5Q",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô hình 3D", "Mô hình Anime"],
    description: "Tượng nhân vật Broly với sức mạnh khủng khiếp.",
    image: [
      "https://img.lazcdn.com/g/ff/kf/S7821b8f9eaaa419199cc0fc4e69c3b7dF.jpg_720x720q80.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKYJDbpvkiLm3T-yUdnx5uRiir8jEt-dPccw&s",
      "https://mohinhfigure.com/wp-content/uploads/2021/08/mo-hinh-roaring-broly-gk-super-saiyan-trang-tri-1..jpg",
      "https://statics.pancake.vn/web-media/f3/04/fa/54/03019f7a4feb0f6925c2526f56f4be736faea8b10173fcb565a0047b.jpg",
      "https://product.hstatic.net/1000174044/product/d4a6ab753871f82fa160_28221741cf904c0685a6606c50976a6a_master.jpg",
    ],
  },
  {
    productId: "GD010",
    name: "Mô Hình Gundam Sandrock GD010",
    slug: "mo-hinh-gundam-sandrock",
    price: 190000,
    stock: 4,
    dificulty: 3,
    pieces: 135,
    width: 24,
    height: 23,
    length: 21,
    video: "VjpKx7fqZkE",
    categorySlug: "assemble",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Gundam", "Mô hình Nhựa"],
    description: "Mô hình lắp ráp Gundam Sandrock Custom.",
    image: [
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lr79qd2n2qbo7b",
      "https://bizweb.dktcdn.net/thumb/large/100/479/026/products/4a0b16cf-f14b-4f48-8244-434418eb7939.jpg?v=1680283053780",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTe6IvSar1tBwK1kWK-7hVSz7Up-tle2W4Ag&s",
      "https://bizweb.dktcdn.net/thumb/large/100/479/026/products/bc051acd-8ab1-49ba-8ff5-4fb18a855c97.jpg?v=1680283052780",
    ],
  },
  {
    productId: "MT013",
    name: "Mô Hình Kim Loại Lâu Đài MT013",
    slug: "mo-hinh-kim-loai-lau-dai",
    price: 51000,
    stock: 2,
    difficulty: 5,
    pieces: 190,
    width: 38,
    height: 40,
    length: 35,
    video: "nqgmdxtnO2I",
    categorySlug: "assemble",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Kim loại", "Mô hình 3D"],
    description: "Mô hình lắp ráp kim loại lâu đài trung cổ.",
    image: [
      "https://anh.quatructuyen.com/media/wysiwyg/do-choi/mo-hinh-3d/mo_hinh_lau_dai_3.jpg",
      "https://kit168.com/wp-content/uploads/2018/06/lau-dai-co-kit168.com_.jpg",
      "https://product.hstatic.net/200000417685/product/lau-dai-co-tich_a0be7e3393c34a56a697240be8dd0db1.jpg",
      "https://img.lazcdn.com/g/p/589be7d6dc6a3dd593f85a54298bf836.jpg_720x720q80.jpg",
    ],
  },
  {
    productId: "DC011",
    name: "Bộ Màu Acrylic DC011",
    slug: "bo-mau-acrylic",
    price: 130000,
    stock: 10,
    difficulty: 0,
    pieces: 0,
    width: 0,
    height: 0,
    length: 0,
    video: "zG_8VnE3sXY",
    categorySlug: "assemble-tool",
    brandName: "Bandai",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description: "Bộ màu acrylic chuyên dụng cho mô hình.",
    image: [
      "https://pos.nvncdn.com/6dc534-15668/ps/20240610_EyQJsaZqaZ.jpeg",
      "https://bizweb.dktcdn.net/100/464/700/files/deli-mau-acrylic-12-mau-12ml1-type-10.jpg?v=1670934356065",
      "https://bizweb.dktcdn.net/100/364/149/products/dsc08459.jpg?v=1654836855187",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/364/149/products/dsc08462.jpg?v=1654836964493",
    ],
  },
  {
    productId: "OP008",
    name: "Mô hình Brook OP008",
    slug: "figure-brook",
    price: 90000,
    stock: 7,
    difficulty: 2,
    pieces: 80,
    width: 18,
    height: 23,
    length: 16,
    video: "x13eB3lKE6M",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô hình OnePiece", "Mô hình Anime"],
    description: "Tượng nhân vật Brook với cây vĩ cầm.",
    image: [
      "https://cipershop.com/public/userfiles/images/do-choi-mo-hinh/mo-hinh-one-piece/brook-01755/54eb111c0537fc69a526.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7qtMN9l74DaiK4ApO1tJC1Ym2ZCHWagsfQ&s",
      "https://www.anhshop.com/wp-content/uploads/2020/06/Brook-Ichiban-Kuji-One-Piece-figure.jpg",
      "https://dinotoystore.vn/wp-content/uploads/2023/12/409347182_1102780820986060_6493032225920973408_n.jpg",
    ],
  },
  {
    productId: "MV001",
    name: "Mô hình Ironman MV001",
    slug: "mo-hinh-ironman",
    price: 150000,
    stock: 6,
    difficulty: 3,
    pieces: 120,
    width: 20,
    height: 30,
    length: 15,
    video: "ksLkBogsHj8",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Marvel", "Mô hình Nhựa"],
    description: "Tượng nhân vật Ironman với bộ giáp Mark 85.",
    image: [
      "https://product.hstatic.net/1000387428/product/download__4__052d5d9db4b64fadbb3c3dac7b61ec5e_master.jpg",
      "https://thegioimohinh.vn/wp-content/uploads/2021/06/02_39a78499-7f95-4432-acbc-d5685464706c_1024x1024.jpeg",
      "https://product.hstatic.net/200000726533/product/-ti-le-110-zdtoys-deluxe-edittion__1__b48a2eafc55e4201913d921d2d75237c_2425415b1c0d49a5b599e41cec56d61e_grande.png",
      "https://bizweb.dktcdn.net/thumb/large/100/098/550/products/mo-hinh-iron-man-mark-xlii-zd-toys-chinh-hang-ti-le-110-mark-42-11.jpg?v=1622278006437",
    ],
  },
  {
    productId: "MV002",
    name: "Mô hình Thor MV002",
    slug: "mo-hinh-thor",
    price: 180000,
    stock: 5,
    difficulty: 2,
    pieces: 100,
    width: 22,
    height: 28,
    length: 18,
    video: "pakRFVMIzOY",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Marvel", "Mô hình Nhựa"],
    description: "Tượng nhân vật Thor với búa Mjolnir.",
    image: [
      "https://down-vn.img.susercontent.com/file/55816e11ab388ed206a7ece43c2ff3c3",
      "https://haloshop.vn/wp-content/uploads/2025/02/Mo-hinh-Marvel-Thor-1.jpg",
      "https://i.otakul.com/14916/tho-18.jpg",
      "https://product.hstatic.net/200000417685/product/mo-hinh-kim-loai-lap-rap-3d-piececool-marvel-thor-mp944_03e08a6d461544538cceafd077fc3c68.jpg",
    ],
  },
  {
    productId: "PKM001",
    name: "Mô hình Pikachu PKM001",
    slug: "mo-hinh-pikachu",
    price: 120000,
    stock: 12,
    difficulty: 1,
    pieces: 50,
    width: 12,
    height: 15,
    length: 10,
    video: "jw0N_waH0L0",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô Hình Pokemon", "Mô hình Nhựa"],
    description: "Tượng nhân vật Pikachu dễ thương.",
    image: [
      "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lu95aj8gfmwf58",
      "https://bizweb.dktcdn.net/100/418/981/products/z4263532369796-512bf96013b10800ca5c7b4425bc9542.jpg?v=1681459383277",
      "https://www.mykingdom.com.vn/cdn/shop/files/mo-hinh-prime-figure-mini-pikachu-funism-pf2042_3.png?v=1724310880&width=416",
      "https://lacdau.com/media/product/2332-4.jpg",
    ],
  },
  {
    productId: "PKM002",
    name: "Mô hình Charizard PKM002",
    slug: "mo-hinh-charizard",
    price: 119000,
    stock: 8,
    difficulty: 3,
    pieces: 95,
    width: 25,
    height: 30,
    length: 20,
    video: "HVfn8zKN9NU",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô Hình Pokemon", "Mô hình 3D"],
    description: "Tượng nhân vật Charizard trong tư thế phun lửa.",
    image: [
      "https://herogame.vn/ad-min/assets/js/libs/kcfinder/upload_resource/images/Vinh%202023/T5%202023/mo-hinh-pokemon-gigantamax-charizard-takara-tomy-ptm001-3.png",
      "https://product.hstatic.net/1000231532/product/n_ban_do_choi_moncolle_mx-02_gigantamax_charizard_takara_tomy_nhat_ban_43fdd851ce84447f9f5d05cbe07e5fd5_grande.jpg",
      "https://bizweb.dktcdn.net/thumb/grande/100/451/227/products/39c4168f-202e-4353-ad49-696051099d58.jpg?v=1649671384163",
      "https://www.mykingdom.com.vn/cdn/shop/products/zc8902e_2_d6445110-898f-4a36-900f-c583f32a0610.jpg?v=1722393414&width=1445",
    ],
  },
  {
    productId: "VH001",
    name: "Mô hình Xe Ferrari VH001",
    slug: "vehicle-ferrari",
    price: 150000,
    stock: 4,
    difficulty: 4,
    pieces: 180,
    width: 30,
    height: 15,
    length: 42,
    video: "Zr7wVn9Dqus",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô Hình Phương tiện", "Mô hình Kim loại"],
    description: "Mô hình xe Ferrari F40 tỉ lệ 1:18.",
    image: [
      "https://jola.vn/cdn/720/Product/DJt9PB97x/mo-hinh-xe-ferrari-sf90-stradale-124-18-26028-2.jpg",
      "https://trummohinh.com/wp-content/uploads/2020/04/IMG-7793.jpg",
      "https://www.mykingdom.com.vn/cdn/shop/products/z8902e_2_d6445110-898f-4a36-900f-c583f32a0610.jpg?v=1722393414&width=1445",
      "https://tmintoys.com/cdn/shop/files/laferraricada.png?v=1705082970",
    ],
  },
  {
    productId: "WD001",
    name: "Mô hình Thuyền buồm gỗ WD001",
    slug: "wood-ship",
    price: 180000,
    stock: 3,
    difficulty: 5,
    pieces: 220,
    width: 45,
    height: 38,
    length: 15,
    video: "Wi-VNUTGOac",
    categorySlug: "assemble",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Gỗ", "Mô hình Phương tiện"],
    description: "Mô hình thuyền buồm cổ điển làm từ gỗ tự nhiên.",
    image: [
      "https://gomynghe.vn/sites/default/files/thuyen-buom-go-phong-thuy-trang-tri-go-huong_11_0.jpg",
      "https://mynghehanoi.com/wp-content/uploads/2018/08/mo-hinh-thuyen-go-buom-thai-lan-go-cam-100cm002.jpg",
      "https://tauthuyenmohinh.com/www/uploads/images/san-pham/Tau-thuyen/tau-thuyen-mo-hinh-thuyen-co-mnv-tb15_compressed.jpg",
      "https://bizweb.dktcdn.net/100/371/660/products/ha-long-huong-2.jpg?v=1596687599477",
    ],
  },
  {
    productId: "GN001",
    name: "Mô hình Súng AK-47 GN001",
    slug: "gun-ak47",
    price: 190000,
    stock: 6,
    difficulty: 3,
    pieces: 120,
    width: 60,
    height: 15,
    length: 10,
    video: "3hXW7eEliL0",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô Hình Súng", "Mô hình Nhựa"],
    description: "Mô hình súng trường AK-47 tỉ lệ 1:3.",
    image: [
      "https://bizweb.dktcdn.net/100/107/049/products/cimg3681-jpg-ee8a1ad5-6bf9-4ef3-9309-4840812a38ae.jpg?v=1500794984120",
      "https://bizweb.dktcdn.net/100/371/660/products/ak47-2-0ac8548c-cf41-43c7-ad17-3c4a579a235b.jpg?v=1598013750773",
      "https://khodochoitreem.com/115162-large_default/reobrix-77005-sung-truong-tan-cong-ak-47.jpg",
      "https://thegioidochoiviet.cdn.vccloud.vn/wp-content/uploads/2022/07/Screenshot_6-43.jpg",
    ],
  },
  {
    productId: "GN002",
    name: "Mô hình Súng Desert Eagle GN002",
    slug: "gun-desert-eagle",
    price: 90000,
    stock: 8,
    difficulty: 2,
    pieces: 75,
    width: 25,
    height: 15,
    length: 8,
    video: "YeAvRni1uTg",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô Hình Súng", "Mô hình Kim loại"],
    description: "Mô hình súng lục Desert Eagle làm từ kim loại.",
    image: [
      "https://product.hstatic.net/200000417685/product/n009ab_gun_puzzle__1__888656fb77044332b6c5c100b0f1b30d_master.jpg",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/526/498/products/304b9b085a7b7e2fc05e02a4d436606f-1726589929456.png?v=1727857969410g",
      "https://product.hstatic.net/200000417685/product/n009ab_gun_puzzle__6__067ae315e18c4554a30be723b8a2e562_master.jpg",
      "https://product.hstatic.net/1000350815/product/de__3__183b3b8064504d6a9601c8fe7a8379bf_master.jpg",
    ],
  },
  {
    productId: "ANM001",
    name: "Mô hình Khủng long T-Rex ANM001",
    slug: "animal-trex",
    price: 120000,
    stock: 5,
    difficulty: 3,
    pieces: 130,
    width: 35,
    height: 28,
    length: 22,
    video: "Zr7wVn9Dqus",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô Hình Động vật", "Mô hình Nhựa"],
    description: "Mô hình khủng long bạo chúa T-Rex với chi tiết chân thực.",
    image: [
      "https://bizweb.dktcdn.net/thumb/grande/100/098/550/files/mo-hinh-khung-long-t-rex-w-dragon-jurassic-park-135-resin-1.jpg?v=1631767119420",
      "https://www.mykingdom.com.vn/cdn/shop/files/sieu-khung-long-bao-chua-t-rex-co-am-thanh-jurassic-world-mattel-hxf53_3.png?v=1732161474",
      "https://www.mykingdom.com.vn/cdn/shop/files/5ac92ffa989b1d4e7dd90aaf4efccb11.jpg?v=1720149734&width=1445",
      "https://down-vn.img.susercontent.com/file/826258aebdd59b789ad907c45671159f",
    ],
  },
  {
    productId: "ARY001",
    name: "Mô hình Xe tăng Tiger ARY001",
    slug: "army-tiger-tank",
    price: 158000,
    stock: 4,
    difficulty: 4,
    pieces: 160,
    width: 32,
    height: 18,
    length: 25,
    video: "kBJOCGeUfr0",
    categorySlug: "figure",
    brandName: "ArtSpirit",
    subCategoryName: ["Mô Hình Quân sự", "Mô hình Kim loại"],
    description: "Mô hình xe tăng Tiger của Đức trong Thế Chiến II.",
    image: [
      "https://tamiyavietnam.vn/userdata/8055/wp-content/uploads/2021/04/35146-1.png",
      "https://tamiyavietnam.vn/userdata/8055/wp-content/uploads/2021/10/56018-1-copy.png",
      "https://down-vn.img.susercontent.com/file/78bc8021567ac6c0dd58a03c1ae092a2",
      "https://mohinhquatang.vn/images/product/goc/1507615309_83053.jpg",
    ],
  },
  {
    productId: "AT001",
    name: "Bộ Dụng Cụ Lắp Ráp Cao Cấp",
    slug: "bo-dung-cu-lap-rap-cao-cap",
    price: 150000,
    stock: 20,
    difficulty: 0,
    pieces: 12,
    width: 25,
    height: 5,
    length: 18,
    video: "1nAK9ggU7Ho",
    categorySlug: "assemble-tool",
    brandName: "18k Super",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description:
      "Bộ dụng cụ 12 món chuyên nghiệp cho mô hình lắp ráp, chất liệu thép không gỉ.",
    image: [
      "https://file.hstatic.net/1000231532/file/gundam_store_vn_bo_dung_cu_lap_rap_gundam_co_ban_cho_nguoi_moi_e8a07f7d75bd4e779f41b7d5224677fb.jpg",
      "https://file.hstatic.net/1000231532/file/230401_bo-dung-cu-lap-rap-gundam-17-mon_nshop1_fd815fd8fe934b93a36a9c9bbf74490a.jpg",
      "https://bizweb.dktcdn.net/thumb/large/100/479/026/products/02495ae1-4eda-488e-999a-901b73cc4cce.jpg?v=1737392613397",
      "https://file.hstatic.net/1000231532/article/et_ke_dong_phuc_duoc_yeu_thich_cua_nguoi_choi_pokemon_scarlet___violet_8826dab9156f4aecb39f4b9d3e1c585c.jpg",
    ],
  },
  {
    productId: "WD002",
    name: "Mô Hình Nhà Gỗ 3D Cổ Điển",
    slug: "mo-hinh-nha-go-3d-co-dien",
    price: 119000,
    stock: 7,
    difficulty: 4,
    pieces: 180,
    width: 35,
    height: 25,
    length: 30,
    video: "3jfCzu8Q3hg",
    categorySlug: "assemble",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Gỗ", "Mô hình 3D"],
    description:
      "Mô hình nhà gỗ 3D phong cách châu Âu cổ điển với 180 chi tiết.",
    image: [
      "https://product.hstatic.net/1000219392/product/mo_hinh_biet_thu_nha_go_co_trang_diy_p001__5__27fc7eda1dae428eb84cfa76470dcb92.png",
      "https://nhago.com//img_data/images/nha-go-chau-au/xu-huong-nha-go-chau-au.jpg",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/526/498/products/sg-11134201-23010-q22bmkvkp1lv41-1726544628701.jpg?v=1727411813937",
      "https://mohinhliti.com/wp-content/uploads/2018/10/mo-hinh-nha-san-lam-bang-go.jpg",
    ],
  },
  {
    productId: "MV003",
    name: "Mô Hình Black Panther",
    slug: "mo-hinh-black-panther",
    price: 109000,
    stock: 5,
    difficulty: 3,
    pieces: 110,
    width: 20,
    height: 28,
    length: 16,
    video: "QxvQAKrWLOE",
    categorySlug: "figure",
    brandName: "Marvel",
    subCategoryName: ["Mô hình Marvel", "Mô hình Nhựa"],
    description: "Tượng Black Panther với bộ giáp Vibranium chi tiết cao.",
    image: [
      "https://haloshop.vn/wp-content/uploads/2025/02/mo-hinh-dc-marvel-black-panther-45-700x700-1.jpg",
      "https://gundamshop.vn/wp-content/uploads/2022/02/a2144b1d385b55dbb887e0df779733b6.jpg",
      "https://arthouseshop.net/uploads/source/vatphamtrangtri/mohinhavg/41re.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVZOoAxRW6kcIP6iCBmAJ8Wnn2lj4Aor8lgQ&s",
    ],
  },
  {
    productId: "PKM003",
    name: "Mô Hình Mewtwo Legendary",
    slug: "mo-hinh-mewtwo-legendary",
    price: 51000,
    stock: 4,
    difficulty: 3,
    pieces: 105,
    width: 18,
    height: 30,
    length: 15,
    video: "vUb_n5JFg_I",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô Hình Pokemon", "Mô hình 3D"],
    description: "Mewtwo phiên bản Legendary với hiệu ứng năng lượng tâm linh.",
    image: [
      "https://herogame.vn/upload/images/img_24_06_2024/mo-hinh-pokemon-prime-figure-mini-mewtwo-funism-1_73332_667969f567e6a4.65576665.jpg",
      "https://salt.tikicdn.com/cache/w300/ts/product/62/48/d1/f74c49e6b3f787fbbdf1fcd2d22bbcc0.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZm5sWi1ZEZaqhsK19hkYcLVe_MsAdMvtzA2nJXngUNz5WvbiYPaNrlAzUid87N4qCgcI&usqp=CAU",
      "https://product.hstatic.net/1000328919/product/mo-hinh-pokemon-mewtwo-takara-tomy-ml-20__2__64b411a87435479583d4a49b94bc1856_grande.png",
    ],
  },
  {
    productId: "ANM002",
    name: "Mô Hình Sư Tử Đồng",
    slug: "mo-hinh-su-tu-dong",
    price: 59000,
    stock: 6,
    difficulty: 2,
    pieces: 1,
    width: 25,
    height: 20,
    length: 15,
    video: "a5ZbgfaZz4g",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô Hình Động vật", "Mô hình Kim loại"],
    description: "Tượng sư tử bằng đồng nguyên khối, chạm khắc tinh xảo.",
    image: [
      "https://updecor.net/wp-content/uploads/woocommerce-reviews/IMG_20210707_104459.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKvYb6gwJEZ82-khHWz9MLBpapkMC4i9J_uw&s",
      "https://vn-test-11.slatic.net/p/b04c65e6dc2463e8b4b5dd11fbf06a84.jpg",
      "https://vn-test-11.slatic.net/p/66898815b561edb18a77d328342a3b30.jpg",
    ],
  },
  {
    productId: "PT001",
    name: "Mô Hình Tàu Chiến Yamato",
    slug: "mo-hinh-tau-chien-yamato",
    price: 120000,
    stock: 3,
    difficulty: 5,
    pieces: 250,
    width: 70,
    height: 25,
    length: 20,
    video: "K_I9JwutLxE",
    categorySlug: "assemble",
    brandName: "Metal Build",
    subCategoryName: ["Mô hình Kim loại", "Mô hình Phương tiện"],
    description:
      "Mô hình tàu chiến Yamato tỉ lệ 1:200 với 250 chi tiết kim loại.",
    image: [
      "https://banmohinhtinh.net/image/upload/catalog/san-pham/mo-hinh-quan-su/mo-hinh-tau-chien/mo-hinh-quan-su-tau-thiet-giap-ham-yamato-ty-le-1-700/mo-hinh-quan-su-tau-thiet-giap-ham-yamato-ty-le-1-700-645-920x700.webp",
      "https://www.1999.co.jp/itbig31/10312067a2.jpg",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/371/660/products/yamato-1-a6816eca-17b6-4774-b09a-794787adc6f1.jpg?v=1597636438747",
      "https://bizweb.dktcdn.net/thumb/grande/100/107/049/products/stb-1991.jpg?v=1471764677117",
    ],
  },
  {
    productId: "AT002",
    name: "Máy Khoan Mini Điều Tốc",
    slug: "may-khoan-mini-dieu-toc",
    price: 150000,
    stock: 15,
    difficulty: 0,
    pieces: 1,
    width: 8,
    height: 15,
    length: 5,
    video: "8tSN03MsN3k",
    categorySlug: "assemble-tool",
    brandName: "Bandai",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description:
      "Máy khoan mini điều chỉnh tốc độ 0-10000 vòng/phút, kèm 10 mũi khoan.",
    image: [
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/442/971/products/94208b43bf2590e438c05ef044311458-1684083814306.jpg?v=1684091142410",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPL5V2t2URY5vEtdXqT123YV2dRxIJlThEvA&s",
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyxtioyff5n105",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsv6wbu2f2MUVoVTn18Vho1ywCmWahFifnww7xGc9QlTE5sYKsufgByB0zMGCj92KMrw4&usqp=CAU",
    ],
  },
  {
    productId: "AN003",
    name: "Mô Hình Nezuko Kamado",
    slug: "mo-hinh-nezuko-kamado",
    price: 120000,
    stock: 8,
    difficulty: 2,
    pieces: 85,
    width: 15,
    height: 22,
    length: 12,
    video: "R8OxG-IZiQQ",
    categorySlug: "figure",
    brandName: "Bandai",
    subCategoryName: ["Mô hình Anime", "Mô hình Nhựa"],
    description: "Tượng Nezuko với miệng ngậm ống tre, chất liệu PVC cao cấp.",
    image: [
      "https://down-vn.img.susercontent.com/file/cd1909b81ba0a2e72e5583a64e652a50",
      "https://product.hstatic.net/1000105776/product/2704673_c5593aa2e105456faed5d4de23fad5ed.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6NdzsSahoT8M2_wbTZImVoeczR-eGmSOQ2w&s",
      "https://bizweb.dktcdn.net/100/418/981/products/39.jpg?v=1670060498790",
    ],
  },
  {
    productId: "WD003",
    name: "Mô Hình Cối Xay Gió 3D",
    slug: "mo-hinh-coi-xay-gio-3d",
    price: 60000,
    stock: 9,
    difficulty: 3,
    pieces: 150,
    width: 30,
    height: 35,
    length: 30,
    video: "G35sIvBAQ4s",
    categorySlug: "assemble",
    brandName: "MegaHouse",
    subCategoryName: ["Mô hình Gỗ", "Mô hình 3D"],
    description:
      "Mô hình cối xay gió Hà Lan bằng gỗ tự nhiên với cánh quạt xoay được.",
    image: [
      "https://flexdecor.vn/wp-content/uploads/2023/10/Mo-hinh-coi-xay-gio-Ha-Lan-decor-phong-khach-HB6563-1.jpg",
      "https://salt.tikicdn.com/cache/w1200/ts/product/4f/2c/b8/c1d42cb3af1f92b4738032cdfb523884.jpg",
      "https://kheotay.com.vn/wp-content/uploads/2018/07/24.png",
      "https://product.hstatic.net/1000328919/product/kim-loai-lap-rap-3d-dutch-windmill-_coi-xay-gio_-_gold-mp253-piececool_772187f8a018444abc36fcbd84a52538_grande.jpg",
    ],
  },
  {
    productId: "AT003",
    name: "Bộ Màu Vẽ Mô Hình Chuyên Nghiệp",
    slug: "bo-mau-ve-mo-hinh-chuyen-nghiep",
    price: 79000,
    stock: 18,
    difficulty: 0,
    pieces: 24,
    width: 20,
    height: 3,
    length: 25,
    video: "PeKU-pBtKUA",
    categorySlug: "assemble-tool",
    brandName: "MegaHouse",
    subCategoryName: ["Dụng cụ lắp ráp"],
    description: "Bộ 24 màu acrylic chuyên dụng cho mô hình, độ bền màu cao.",
    image: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX7ykWgsI3JOxyq59wYb51b8FE8xWz_8sNsQ&s",
      "https://product.hstatic.net/1000332761/product/hg95w-05_e62c2bcc15e045438051047ce3f9c75f_master.png",
      "https://product.hstatic.net/1000332761/product/e93-94af-4038-9d2e-c4c90f1fa2ec_d8043846b54f41c3b9b2772916519510_large_dc1bdc04a6c44968b5c64a97ad42a68b_master.png",
      "https://artstore.com.vn/wp-content/uploads/2018/06/B%E1%BB%99-m%C3%A0u-v%E1%BA%BD-%C4%91a-n%C4%83ng-Mont-Marte-174pcs-H%C3%A0ng-c%C3%B3-s%E1%BA%B5n-6-400x400.jpg",
    ],
  },
];
const postData = [
  {
    title: "Nhân Đôi Ưu Đãi – Mừng Xuân Giáp Thìn",
    author: "BCshop",
    type: "blog",
    slug: "nhan-doi-uu-dai-mung-xuan-giap-thin",
    subContent:
      "Gấp đôi ưu đãi tặng Chậu Hoa Nhỏ, Thiên Ngữ Hạc hoặc Lân Phát Tài Mini mừng Xuân Giáp Thìn. Khuyến mãi diễn ra từ 1/2 đến 29/2 với hoá đơn từ 599k và miễn phí giao hàng tận nơi",
    mainImage:
      "https://file.hstatic.net/200000417685/article/pre_tet_2024_post_banner_3048beed727645bfacc8157d56088cb6.jpg",
    content: [
      {
        id: "thoi-gian",
        title: "Thời gian áp dụng",
        image: "",
        description:
          "Từ <span class='font-semibold'>1/2</span> đến hết ngày <span class='font-semibold '>29/2</span>",
      },
      {
        id: "noi-dung",
        title: "Nội dung chương trình",
        image: "",
        description: `Khi mua bất kì đơn hàng mô hình tại BCshop có giá trị từ 599.000 đ trở lên, bạn sẽ được tặng mô hình Chậu Hoa Nhỏ, Thiên Ngữ Hạc hoặc Lân Phát Tài Mini. Cụ thể như sau:

        – Đơn hàng từ <span class=" font-bold ">599.000 đ</span>, được tặng 1 mô hình nhựa 3D Chậu Hoa Nhỏ (trị giá <span class=" font-bold">78k</span>)

        – Đơn hàng từ <span class=" font-bold ">1.299.000 đ</span>, được tặng 1 mô hình kim loại 3D Thiên Ngữ Hạc (trị giá <span class=" font-bold">200k</span>)

        – Đơn hàng từ <span class=" font-bold">2.499.000 đ</span>, được tặng 1 mô hình kim loại 3D Lân Phát Tài Mini (trị giá <span class=" font-bold">270k</span>)

        Lưu ý: Chậu Hoa Nhỏ, Thiên Ngữ Hạc và Lân Mini là dạng Blind Box, vì vậy chúng tôi sẽ giao màu ngẫu nhiên.

        Mỗi khách hàng chỉ được hưởng ưu đãi tặng Chậu Hoa Nhỏ, Thiên Ngữ Hạc, Lân Mini tối đa 2 sản phẩm. Ví dụ: <span class='hover:text-primary'>2x Thiên Ngữ Hạc</span> hoặc <span class='hover:text-primary'>2x Lân Mini</span> hoặc <span class='hover:text-primary'>1 Thiên Ngữ Hạc</span> và <span class='hover:text-primary'>1 Lân Mini</span>

        Ngoài ra quý khách hàng sẽ được nhân đôi ưu đãi, hưởng thêm chính sách ưu đãi theo đơn hàng đang có tại BCshop. Nội dung chi tiết quý khách vui lòng xem tại đây: <a href="https://myshop.vn/chinh-sach-uu-dai/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">https://myshop.vn/chinh-sach-uu-dai/</a>`,
      },
      {
        id: "thong-tin-san-pham",
        title: "Thông tin sản phẩm",
        image: "",
        description:
          "Sản phẩm thuộc chương trình bao gồm: Chậu Hoa Nhỏ, Thiên Ngữ Hạc và Lân Phát Tài Mini",
      },
      {
        id: "cach-thuc-dat-hang",
        title: "Cách thức đặt hàng hợp lệ",
        image: "",
        description: `Giả sử đơn hàng gốc của quý khách sẽ mua là <span class='font-semibold'>1.100.000 đ</span>. Quý khách được hưởng 2 ưu đãi:

        1. Ưu đãi thuộc chương trình ưu đãi theo giá trị đơn hàng
        2. Nhân Đôi Ưu Đãi – Mừng Xuân Giáp Thìn (tặng 2 <span class='hover:text-primary'>Chậu Hoa Nhỏ</span> hoặc 2 <span class='hover:text-primary'>Thiên Ngữ Hạc</span> hoặc 1 <span class='hover:text-primary'>Chậu Hoa Nhỏ</span> + 1 <span class='hover:text-primary'>Thiên Ngữ Hạc</span> hoặc 1 <span class='hover:text-primary'>Lân Mini</span>)
        Quý khách vui lòng KHÔNG cho sản phẩm thuộc chương trình trên vào giỏ hàng , tại mục Lưu ý của bước Thanh Toán. Quý khách vui lòng ghi:Thiên Ngữ Hạc, Lân Mini…

        BCshop.vn sẽ kiểm tra đơn hàng và điều chỉnh giá lại, sau đó sẽ xác nhận với quý khách hàng qua điện thoại hoặc Page Facebook <a href="https://m.me/myshop.vn/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">https://m.me/myshop.vn/</a>

        Lưu ý: Giá trị đơn hàng áp dụng Chương Trình Ưu Đãi sẽ bao gồm sản phẩm giảm giá`,
      },
      {
        id: "doi-tuong-tham-gia",
        title: "Đối tượng tham gia",
        image: "",
        description: `Tất cả khách hàng mua tại cửa hàng, mua online thông qua Fanpage Facebook và đặt hàng trên Website <a href="https://myshop.vn" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">https://myshop.vn</a>
          Mỗi khách hàng chỉ được hưởng ưu đãi tặng Chậu Hoa Nhỏ, Thiên Ngữ Hạc, Lân Mini tối đa 2 sản phẩm. Ví dụ: 2x Thiên Ngữ Hạc hoặc 2x Lân Mini hoặc 1 Thiên Ngữ Hạc và 1 Lân Mini`,
      },
      {
        id: "luu-y",
        title: "Lưu ý",
        image: "",
        description: `Quý khách hàng vui lòng liên hệ nhân viên của BCshop.vn để kiểm tra tình trạng còn hàng của các sản phẩm thông qua Fanpage Facebook <a href="https://m.me/myshop.vn/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">https://m.me/myshop.vn/</a> hoặc qua Hotline: 0988 888 888 (Mr. Bac)

        Đơn hàng gốc được áp dụng chương trình ưu đãi hiện có của BCshop.vn: <a href="https://myshop.vn/chinh-sach-uu-dai/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">https://myshop.vn/chinh-sach-uu-dai/</a>

        Không áp dụng đổi trả, bảo hành đối với sản phẩm Chậu Hoa Nhỏ, Thiên Ngữ Hạc và Lân Mini
        `,
      },
      {
        id: "cau-hoi-thuong-gap",
        title: "Câu hỏi thường gặp",
        image: "",
        description: `Q: Đơn gốc của mình trên 290k có được miễn ship không? <br />
        A: Có

        Q: Đơn gốc của mình có được áp dụng chương trình ưu đãi theo giá trị đơn hàng không (https://myshop.vn/pages/chuong-trinh-uu-dai)
        A: Có

        Q: Đơn gốc của mình giá trị cao, có được tặng nhiều Thiên Ngữ Hạc và Lân Mini không?
        A: Mỗi khách hàng chỉ được hưởng ưu đãi tặng Chậu Hoa Nhỏ, Thiên Ngữ Hạc, Lân Mini tối đa 2 sản phẩm. Ví dụ: 2x Thiên Ngữ Hạc hoặc 2x Lân Mini hoặc 1 Thiên Ngữ Hạc và 1 Lân Mini

        Q: Chương trình có tích điểm AP cho mình không?
        A: Có

        Q: Fanpage Facebook của BCshop là gì?
        A: https://m.me/myshop.vn/

        Q: Mình muốn tư vấn trực tiếp, hotline của bạn là gì?
        A: Hotline: 0988 888 888 (Mr. Bac)
        `,
      },
    ],
  },
  {
    title: "MUA KÈM DEAL SỐC - GIẢM ĐẾN 70%",
    author: "BCshop",
    type: "blog",
    slug: "mua-kem-deal-soc-giam-den-70",
    subContent:
      "Mua kèm deal sốc hơn 50 sản phẩm HOT giảm giá đến 70% khi mua sắm với hóa đơn từ 399K . Áp dụng từ 7/3 ~ 15/3. FREESHIP với đơn từ 290K",
    mainImage:
      "https://file.hstatic.net/200000417685/article/deal_soc_2024_post_banner_b4d320b2ab8c43e0b8119e36c876778f.jpg",
    content: [
      {
        id: "thoi-gian",
        title: "Thời gian áp dụng",
        image: "",
        description:
          "Từ <span class='font-semibold'>7/3</span> đến hết ngày <span class='font-semibold'>15/3</span>",
      },
      {
        id: "noi-dung",
        title: "Nội dung chương trình",
        image: "",
        description: `Khi mua sắm với hóa đơn từ 399K, quý khách hàng sẽ được tham gia chương trình Mua Kèm Deal Sốc hơn 50 sản phẩm HOT với giá giảm đến 70%

          Danh sách sản phẩm thuộc chương trình Deal Sốc 2025 quý khách xem tại đây: https://vidu.vn/collections/deal-soc-2025/

          Cụ thể như sau:

          - Hóa Đơn (HĐ) từ <span class='font-semibold'>399K</span>: Mua 1 sản phẩm có tag Deal Sốc 99K chỉ với giá 99K

          - HĐ từ <span class='font-semibold'>499K</span>: Mua 1 sản phẩm có tag Deal Sốc 299K chỉ với giá 299K

          - HĐ từ <span class='font-semibold'>699K</span>: Mua 1 sản phẩm có tag Deal Sốc 499K chỉ với giá 499K

          - HĐ từ <span class='font-semibold'>899K</span>: Mua 1 sản phẩm có tag Deal Sốc 699K chỉ với giá 699K

          - HĐ từ <span class='font-semibold'>1099K</span>: Mua 1 sản phẩm có tag Deal Sốc 899K

          Áp dụng mua nhiều sản phẩm Deal Sốc trên cùng 1 hóa đơn

          Không giới hạn số lần mua sắm

          Áp dụng FREESHIP đối với hóa đơn từ <span class='font-semibold'>290K</span>

          Không áp dụng sản phẩm Deal Sốc đối với các chương trình khuyến mãi khác. Quyền quyết định cuối cùng thuộc về Art Puzzle`,
      },
      {
        id: "cach-thuc-dat-hang",
        title: "Cách thức đặt hàng hợp lệ",
        image:
          "https://file.hstatic.net/200000417685/file/screenshot_2024-01-06_233455_29b4d669fe6e446f8485a0fb6f72f73e_grande.png",
        description: `Ví dụ: Khách hàng mua 3 sản phẩm trong giỏ hàng (sản phẩm A = 400.000đ, sản phẩm B = 600.000đ, sản phẩm C = 500.000 đ)

        Tổng hóa đơn: <span class='font-semibold'>1.500.000đ</span>, áp voucher giảm 4% (<span class='font-semibold'>60K</span>) => Tổng thanh toán: <span class='font-semibold'>1.440.000 đ</span>

        Quý khách hàng được tham gia chương trình Deal Sốc 2024 linh hoạt như sau:

        - Lựa chọn 1: mua 4 sản phẩm trong danh sách Deal Sốc <span class='font-semibold'>99K</span>, tổng đơn: 1.440.000 đ + (99.000 * 4) = 1.836.000đ

        - Lựa chọn 2: mua 2 sản phẩm trong danh sách Deal Sốc <span class='font-semibold'>299K</span> và 1 sản phẩm trong danh sách Deal Sốc <span class='font-semibold'>99K</span>, tổng đơn: 1.440.000 đ + (299.000 đ * 2) + 99.000 đ = 2.137.000 đ

        - Lựa chọn 3: mua 2 sản phẩm trong danh sách Deal Sốc <span class='font-semibold'>499k</span>, tổng đơn: 1.440.000 đ + (499.000 đ * 2) = 2.438.000 đ

        - Lựa chọn 4: mua 1 sản phẩm trong danh sách Deal Sốc <span class='font-semibold'>699K</span> và 1 sản phẩm trong danh sách Deal Sốc <span class='font-semibold'>299K</span>, tổng đơn: 1.440.000 đ + 699.000 đ + 299.000 đ = 2.438.000 đ

        - Lựa chọn 5: mua 1 sản phẩm trong danh sách Deal Sốc <span class='font-semibold'>899k</span> và 1 sản phẩm trong danh sách Deal Sốc <span class='font-semibold'>99K</span>, tổng đơn: 1.440.000 đ + 899.000 đ + 99.000 đ = 2.438.000 đ

        Quý khách có thể tự linh động kết hợp tùy vào giá trị hóa đơn, có thể mua 1 hoặc nhiều sản phẩm Deal Sốc.

        Cuối cùng, quý khách hàng ghi chú danh sách sản phẩm muốn mua Deal Sốc tại trang Giỏ Hàng với nội dung: Deal Sốc sản phẩm [Mã SP 1], [Mã SP 2], [Mã SP 3].

        `,
      },
      {
        id: "doi-tuong-tham-gia",
        title: "Đối tượng tham gia",
        image: "",
        description: `Tất cả khách hàng mua tại cửa hàng, mua online thông qua Fanpage Facebook và đặt hàng trên Website https://myshop.vn`,
      },
      {
        id: "luu-y",
        title: "Lưu ý",
        image: "",
        description: `Không áp dụng sản phẩm Deal Sốc đối với các chương trình khuyến mãi khác. Quyền quyết định cuối cùng thuộc về Chủ shop`,
      },
      {
        id: "cau-hoi-thuong-gap",
        title: "Câu hỏi thường gặp",
        image: "",
        description: `Q: Đơn gốc của mình trên 290k có được miễn ship không?
          A: Có

          Q: Mình có thể xem danh sách sản phẩm Deal Sốc 2024 tại đâu?
          A: Quý khách xem tại đây: https://vidu.vn/collections/deal-soc-2025/

          Q: Đơn gốc của mình có được áp dụng chương trình ưu đãi không (https://myshop.vn/chinh-sach-uu-dai/)?
          A: Có

          Q: Chương trình có tích điểm AP cho mình không?
          A: Có (không bao gồm sản phẩm Deal Sốc)

          Q: Fanpage Facebook của BCshop là gì?
          A: https://m.me/myshop.vn/

          Q: Mình muốn tư vấn trực tiếp, hotline của bạn là gì?
          A: Hotline: 0988 888 888 (Mr. Bac)
        `,
      },
    ],
  },
  {
    title: "Back to School - Super Sale giảm đến 50%",
    slug: "back-to-school-super-sale-giam-den-50",
    author: "Lê Bắc",
    type: "blog",
    subContent:
      "Super Sale giảm giá đến 50% toàn bộ mô hình khi đặt hàng thành công tại website BCshop.vn. FREESHIP với đơn từ 290K",
    mainImage:
      "https://file.hstatic.net/200000417685/article/back_to_school_post_banner_5908bde6d788488383049a6f6213c3c4.jpg",
    content: [
      {
        id: "thoi-gian",
        title: "Nội dung chương trình",
        image: "",
        description: `Giảm giá đến <span class='font-semibold'>50%</span> với tất cả sản phẩm mô hình kim loại, mô hình anime, tại BCshop.vn. Giá sản phẩm tại website là giá đã giảm

        Áp dụng FREESHIP đối với hóa đơn từ <span class='font-semibold'>290K</span>

        Áp dụng đối với chương trình ưu đãi tại https://myshop.vn/pages/chuong-trinh-uu-dai

        Không áp dụng đối với các chương trình khuyến mãi khác. Quyền quyết định cuối cùng thuộc về Chủ shop
        `,
      },
      {
        id: "noi-dung",
        title: "Cách thức đặt hàng hợp lệ",
        image: "",
        description: `Quý khách hàng là thành viên tại BCshop.vn, đặt hàng thành công tại website đối với 3 hình thức thanh toán: COD, VNPay và chuyển khoản ngân hàng`,
      },
      {
        id: "doi-tuong-tham-gia",
        title: "Đối tượng tham gia",
        image: "",
        description: `Tất cả khách hàng mua tại cửa hàng, mua online thông qua Fanpage Facebook và đặt hàng trên Website https://myshop.vn`,
      },
      {
        id: "luu-y",
        title: "Lưu ý",
        image: "",
        description: `Quý khách hàng vui lòng liên hệ nhân viên của BCshop.vn để kiểm tra tình trạng còn hàng của các sản phẩm thông qua Fanpage Facebook https://m.me/myshop.vn/ hoặc qua Hotline: 0988 888 888 (Mr. Bac)
        Quý khách hàng vui lòng quay phim khi unbox sản phẩm, chúng tôi sẽ không giải quyết bất kỳ khiếu nại nào nếu không có video
        `,
      },
      {
        id: "cau-hoi-thuong-gap",
        title: "Câu hỏi thường gặp",
        image: "",
        description: `Q: Đơn của mình trên 290k có được miễn ship không?
        A: Có

        Q: Đơn của mình có được áp dụng thêm chương trình ưu đãi không (https://myshop.vn/pages/chuong-trinh-uu-dai)?
        A: Có

        Q: Chương trình có tích điểm AP cho mình không?
        A: Không

        Q: Fanpage Facebook của BCshop là gì?
        A: https://m.me/myshop.vn/

        Q: Mình muốn tư vấn trực tiếp, hotline của bạn là gì?
        A: Hotline: 0988 888 888 (Mr. Bac)
        `,
      },
    ],
  },
  {
    title: "Mừng Xuân Ất Tỵ 2025 - Giảm giá đến 50%",
    author: "Bắc Còi",
    type: "blog",
    slug: "mung-xuan-at-ty-2025-giam-gia-den-50",
    subContent:
      "Giảm giá đến 50% toàn bộ mô hình khi đặt hàng thành công tại website BCshop.vn. FREESHIP với đơn từ 290K",
    mainImage: "https://novelty.com.vn/public/uploads/files/2025.png",
    content: [
      {
        id: "thoi-gian",
        title: "Thời gian áp dụng",
        image: "",
        description:
          "Chương trình khuyến mãi mừng Xuân Ất Tỵ sẽ diễn ra từ <span class='font-semibold'>20/01/2025</span> đến hết ngày <span class='font-semibold'>09/02/2025</span>. Hãy nhanh tay để không bỏ lỡ những ưu đãi cực hấp dẫn chỉ có trong dịp Tết này nhé!",
      },
      {
        id: "noi-dung",
        title: "Nội dung chương trình",
        image: "",
        description: `Giảm giá trực tiếp lên đến <span class='font-semibold'>50%</span>: Hàng loạt các sản phẩm mô hình đa dạng từ các thương hiệu uy tín sẽ được giảm giá mạnh. Bạn có thể tìm thấy mô hình anime, game, siêu anh hùng, xe cộ, máy bay, robot... với mức giá cực kỳ phải chăng.
         - Lì xì may mắn đầu năm: Với mỗi đơn hàng đạt giá trị tối thiểu, bạn sẽ nhận được những phần quà "lì xì" bất ngờ, giới hạn số lượng:
         - Đơn hàng từ <span class='font-semibold'>500.000 VNĐ</span>: Tặng 1 lì xì độc quyền chứa phiếu giảm giá cho đơn hàng sau.
         - Đơn hàng từ <span class='font-semibold'>1.000.000 VNĐ</span>: Tặng 1 móc khóa mô hình phiên bản giới hạn hoặc standee Tết xinh xắn.
         - Đơn hàng từ <span class='font-semibold'>1.500.000 VNĐ</span>: Tặng 1 mô hình đặc biệt (có thể là mô hình hiếm hoặc phiên bản đặc biệ
        `,
      },
      {
        id: "cach-thuc-dat-hang",
        title: "Cách thức đặt hàng hợp lệ",
        image: "",
        description: `Để đảm bảo bạn nhận được ưu đãi một cách thuận lợi nhất, vui lòng thực hiện theo các bước sau:

        1. Truy cập website: Vào trang chủ của chúng tôi và tìm đến mục "Ưu đãi Tết Ất Tỵ 2025" hoặc các sản phẩm có gắn nhãn "Giảm giá Tết".
        2. Chọn sản phẩm: Thêm các sản phẩm bạn muốn mua vào giỏ hàng.
        3. Kiểm tra ưu đãi: Hệ thống sẽ tự động áp dụng mức giảm giá và các quà tặng "lì xì" (nếu đơn hàng đủ điều kiện).
        4. Điền thông tin giao hàng: Cung cấp đầy đủ và chính xác thông tin nhận hàng, số điện thoại liên hệ. Vui lòng lưu ý thời gian giao hàng có thể bị ảnh hưởng bởi lịch nghỉ Tết.
        5. Hoàn tất thanh toán: Lựa chọn phương thức thanh toán phù hợp (thanh toán khi nhận hàng, chuyển khoản ngân hàng, ví điện tử...).
        6. Xác nhận đơn hàng: Sau khi đặt hàng thành công, bạn sẽ nhận được email/tin nhắn xác nhận từ chúng tôi.
          Lưu ý: Chương trình có thể kết thúc sớm hơn dự kiến nếu số lượng sản phẩm ưu đãi hoặc quà tặng hết trước thời hạn. Vui lòng đặt hàng sớm để nhận được sản phẩm trước Tết.
        Kính chúc quý khách hàng và gia đình một năm mới Ất Tỵ 2025 An Khang Thịnh Vượng, Vạn Sự Như Ý! Chúc bạn có những phút giây mua sắm thật vui vẻ và rinh lộc về nhà!
          `,
      },
      {
        id: "doi-tuong-tham-gia",
        title: "Đối tượng tham gia",
        image: "",
        description: `Chương trình áp dụng cho tất cả các khách hàng mua sắm trực tuyến trên website của chúng tôi trong thời gian diễn ra sự kiện. Dù bạn là người yêu thích mô hình, muốn làm quà tặng hay đơn giản là tìm kiếm một món đồ trang trí độc đáo cho ngày Tết, đều có thể tham gia.
        `,
      },
      {
        id: "luu-y",
        title: "Lưu ý",
        image: "",
        description: `Quý khách hàng vui lòng liên hệ nhân viên của BCshop.vn để kiểm tra tình trạng còn hàng của các sản phẩm thông qua Fanpage Facebook https://m.me/myshop.vn/ hoặc qua Hotline: 0988 888 888 (Mr. Bac)
        Quý khách hàng vui lòng quay phim khi unbox sản phẩm, chúng tôi sẽ không giải quyết bất kỳ khiếu nại nào nếu không có video
        `,
      },
      {
        id: "cau-hoi-thuong-gap",
        title: "Câu hỏi thường gặp",
        image: "",
        description: `Q: Đơn gốc của mình trên 290k có được miễn ship không? <br />
        A: Có

        Q: Đơn gốc của mình có được áp dụng chương trình ưu đãi theo giá trị đơn hàng không (https://mys
        A: Có

        Q: Đơn gốc của mình giá trị cao, có được tặng nhiều Thiên Ngữ Hạc và Lân Mini không?
        A: Mỗi khách hàng chỉ được hưởng ưu đãi tặng Chậu Hoa Nhỏ, Thiên Ngữ Hạc, Lân Mini tối đa 2 sản phẩm. Ví dụ: 2x Thiên Ngữ Hạc HOẶC 2x Lân Mini HOẶC 1 Thiên Ngữ Hạc và 1 Lân Mini

        Q: Chương trình có tích điểm AP cho mình không?
        A: Có

        Q: Fanpage Facebook của BCshop là gì?
        A: https://m.me/myshop.vn/

        Q: Mình muốn tư vấn trực tiếp, hotline của bạn là gì?
        A: Hotline: 0988 888 888 (Mr. Bac)
        `,
      },
    ],
  },
  {
    title: "Siêu Sale Đại Chiến Mô Hình Anime: Cơ Hội Vàng Cho Fan!",
    author: "Jack J97",
    type: "blog",
    slug: "sieu-sale-dai-chien-mo-hinh-anime",
    subContent:
      "Giảm giá đến 50% toàn bộ mô hình Anime khi đặt hàng thành công tại website BCshop.vn. FREESHIP với đơn từ 290K",
    mainImage:
      "https://instagram.fhan5-9.fna.fbcdn.net/v/t39.30808-6/496206820_1285304243601034_2641162190785516577_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE2MDB4MTIwMC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fhan5-9.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QESZKc5RZUKiScbo5IO8-UBGMfMuOMTaEGUM_vMPHwZPfWKYeK-_pHe74flEZC10IM&_nc_ohc=VfHlvnWrQ0wQ7kNvwGgqUxW&_nc_gid=DiDuv6rrBtfdB2IUNbQAmA&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzYwNjY0NjYzNTIyOTEyNDUxMw%3D%3D.3-ccb7-5&oh=00_AfOC8AleLJW8wPbhM-BN55YhndZprTAW77je9pKT30y6Lg&oe=6856190A&_nc_sid=10d13b",
    content: [
      {
        id: "thoi-gian",
        title: "Thời gian áp dụng",
        image: "",
        description: `Trận chiến Siêu Sale Đại Chiến Mô Hình Anime sẽ diễn ra từ <span class="font-semibold">09/04/2025</span> đến hết ngày <span class="font-semibold">26/04/2025</span> ngay trên website của chúng tôi. Hãy sẵn sàng ra khơi và tham gia vào cuộc săn lùng những báu vật mô hình hiếm có!
        `,
      },
      {
        id: "noi-dung",
        title: "Nội dung chương trình",
        image: "",
        description: `Giảm giá SỐC lên đến 50%: Hàng trăm mẫu mô hình Anime đa dạng từ các thương hiệu nổi tiếng như Bandai, Megahouse, Banpresto... sẽ được giảm giá mạnh. Từ những figure POP, Figuarts ZERO chi tiết đến các dòng WCF, Grandline Men/Women độc đáo, tất cả đều đang chờ bạn khám phá với mức giá cực kỳ ưu đãi.
        Flash Sale mỗi ngày: Theo dõi website để không bỏ lỡ các đợt Flash Sale đặc biệt diễn ra hàng ngày, với những sản phẩm Anime HOT nhất được giảm giá cực sâu trong thời gian ngắn. Nhanh tay thì còn, chậm tay thì hết!
        Combo "Chung một nhà": Mua theo combo các cặp nhân vật hoặc nhóm sẽ nhận được mức ưu đãi lớn hơn nữa. Đây là cơ hội tuyệt vời để sở hữu trọn bộ những khoảnh khắc đáng nhớ của băng nh.
        Quà tặng độc quyền "Hải Tặc Mới": Với mỗi đơn hàng mô hình OnePiece đạt giá trị tối thiểu, bạn sẽ nhận được những phần quà bất ngờ dành riêng cho fan:
        Đơn hàng từ <span class="font-semibold">800.000 VNĐ</span>: Tặng 1 <span class="hover:text-red-500">Móc khóa Wanted Poster</span> ngẫu nhiên.
        Đơn hàng từ <span class="font-semibold">1.500.000 VNĐ</span>: Tặng 1 <span class="hover:text-red-500">Standee Acrylic</span> nhân vật Naruto yêu thích.
        Đơn hàng từ <span class="font-semibold">2.000.000 VNĐ</span>: Tặng 1 <span class="hover:text-red-500">Mini Figure</span> bí ẩn hoặc <span class="hover:text-red-500">Bộ ngọc rồng</span> phiên bản giới hạn.
        Miễn phí vận chuyển: Áp dụng cho tất cả các đơn hàng mô hình Anime có giá trị từ <span class="font-semibold">700.000 VNĐ</span> trở lên trên toàn quốc.
        `,
      },
      {
        id: "cach-thuc-dat-hang",
        title: "Cách thức đặt hàng hợp lệ",
        image: "",
        description: `Để gia nhập trận chiến và rinh về những mô hình yêu thích, bạn chỉ cần thực hiện theo các bước đơn giản sau:

        1. Cập bến website: Truy cập trang chủ của chúng tôi và tìm đến khu vực "Siêu Sale Đại Chiến Mô Hình Anime".
        2. Khám phá kho báu: Duyệt qua danh mục sản phẩm, tìm kiếm những mô hình của các nhân vật bạn yêu thích.
        3. Thêm vào "Hòm Kho Báu" (giỏ hàng): Chọn các sản phẩm muốn mua và thêm vào giỏ hàng của bạn.
        4. Kiểm tra "Bản Đồ Kho Báu" (tổng kết đơn hàng): Hệ thống sẽ tự động áp dụng mức giảm giá và hiển thị các quà tặng kèm (nếu đơn hàng đủ điều kiện).
        5. Điền thông tin "Thuyền Viên": Cung cấp đầy đủ và chính xác thông tin nhận hàng, số điện thoại liên hệ để chúng tôi có thể vận chuyển "chiến lợi phẩm" đến tay bạn.
        6. Hoàn tất "Thương Vụ": Lựa chọn phương thức thanh toán phù hợp (thanh toán khi nhận hàng, chuyển khoản ngân hàng, ví điện tử...).
        7. "Hạ Cánh" và chờ nhận hàng: Sau khi đặt hàng thành công, bạn sẽ nhận được email/tin nhắn xác nhận đơn hàng từ chúng tôi.
        Hãy cùng chúng tôi viết nên một chương mới trong lịch sử sưu tập mô hình của bạn! Chúc bạn có một cuộc Siêu Sale Đại Chiến Mô Hình Anime thật thành công và rinh về thật nhiều chiến lợi phẩm giá trị!
        `,
      },
      {
        id: "doi-tuong-tham-gia",
        title: "Đối tượng tham gia",
        image: "",
        description: `Cuộc chiến này dành cho tất cả các fan hâm mộ Anime. Tất cả khách hàng mua tại showroom, mua online thông qua Fanpage Facebook và đặt hàng trên Website https://bcshop.vn`,
      },
      {
        id: "luu-y",
        title: "Lưu ý",
        image: "",
        description: `Quý khách hàng vui lòng liên hệ nhân viên của BCshop.vn để kiểm tra tình trạng còn hàng của các sản phẩm thông qua Fanpage Facebook https://m.me/myshop.vn/ hoặc qua Hotline: 0988 888 888 (Mr. Bac)
        Quý khách hàng vui lòng quay phim khi unbox sản phẩm, chúng tôi sẽ không giải quyết bất kỳ khiếu nại nào nếu không có video
        `,
      },
      {
        id: "cau-hoi-thuong-gap",
        title: "Câu hỏi thường gặp",
        image: "",
        description: `Q: Đơn gốc của mình trên 290k có được miễn ship không? <br />
        A: Có

        Q: Đơn gốc của mình có được áp dụng chương trình ưu đãi theo giá trị đơn hàng không (https://mys
        A: Có

        Q: Đơn gốc của mình giá trị cao, có được tặng nhiều Thiên Ngữ Hạc và Lân Mini không?
        A: Mỗi khách hàng chỉ được hưởng ưu đãi tặng Chậu Hoa Nhỏ, Thiên Ngữ Hạc, Lân Mini tối đa 2 sản phẩm. Ví dụ: 2x Thiên Ngữ Hạc HOẶC 2x Lân Mini HOẶC 1 Thiên Ngữ Hạc và 1 Lân Mini

        Q: Chương trình có tích điểm AP cho mình không?
        A: Có

        Q: Fanpage Facebook của BCshop là gì?
        A: https://m.me/myshop.vn/

        Q: Mình muốn tư vấn trực tiếp, hotline của bạn là gì?
        A: Hotline: 0988 888 888 (Mr. Bac)
        `,
      },
    ],
  },
  {
    title: "[BLACK FRIDAY] GIẢM ĐẾN 63% - NGẬP TRÀN ƯU ĐÃI",
    author: "Lionel Messi",
    type: "blog",
    slug: "black-friday-giam-den-63-ngap-tron-uu-dai",
    subContent:
      "Giảm giá đến 63% toàn bộ mô hình khi đặt hàng thành công tại website BCshop.vn. FREESHIP với đơn từ 290K",
    mainImage:
      "https://cdn-media.sforum.vn/storage/app/media/nhuy/Nhu-Y/black-friday-banner-5.jpg",
    content: [
      {
        id: "noi-dung",
        title: "Nội dung chương trình",
        image: "",
        description: `Giảm giá đến <span class="font-semibold">63%</span> với tất cả sản phẩm mô hình Gundam và màu vẽ tại BCshop.vn. Giá sản phẩm tại website là giá đã gi

        Xem toàn bộ mô hình lắp ráp 3D tại đây: https://bcshop.vn/shop

        Áp dụng FREESHIP đối với hóa đơn từ <span class="text-black">290K</span>

        Áp dụng đối với chương trình ưu đãi tại https://bcshop.vn/pages/chuong-trinh-uu-dai

        Không áp dụng đối với các chương trình khuyến mãi khác. Quyền quyết định cuối cùng thuộc về BCshop.vn
        `,
      },
      {
        id: "cach-thuc-dat-hang",
        title: "Cách thức đặt hàng hợp lệ",
        image: "",
        description: `Quý khách hàng là thành viên tại ArtPuzzle.vn, đặt hàng thành công tại website đối với 3 hình thức thanh toán: COD, MOMO và chuyển khoản ngân hàng
        `,
      },
      {
        id: "doi-tuong-tham-gia",
        title: "Đối tượng tham gia",
        image: "",
        description: `Tất cả khách hàng mua tại showroom, mua online thông qua Fanpage Facebook và đặt hàng trên Website https://bcshop.vn
        `,
      },
      {
        id: "luu-y",
        title: "Lưu ý",
        image: "",
        description: `Quý khách hàng vui lòng liên hệ nhân viên của BCshop.vn để kiểm tra tình trạng còn hàng của các sản phẩm thông qua Fanpage Facebook https://m.me/myshop.vn/ hoặc qua Hotline: 0988 888 888 (Mr. Bac)
        Quý khách hàng vui lòng quay phim khi unbox sản phẩm, chúng tôi sẽ không giải quyết bất kỳ khiếu nại nào nếu không có video
        `,
      },
      {
        id: "cau-hoi-thuong-gap",
        title: "Câu hỏi thường gặp",
        image: "",
        description: `Q: Đơn gốc của mình trên 290k có được miễn ship không? <br />
        A: Có

        Q: Đơn gốc của mình có được áp dụng chương trình ưu đãi theo giá trị đơn hàng không (https://mys
        A: Có

        Q: Đơn gốc của mình giá trị cao, có được tặng nhiều Thiên Ngữ Hạc và Lân Mini không?
        A: Mỗi khách hàng chỉ được hưởng ưu đãi tặng Chậu Hoa Nhỏ, Thiên Ngữ Hạc, Lân Mini tối đa 2 sản phẩm. Ví dụ: 2x Thiên Ngữ Hạc HOẶC 2x Lân Mini HOẶC 1 Thiên Ngữ Hạc và 1 Lân Mini

        Q: Chương trình có tích điểm AP cho mình không?
        A: Có

        Q: Fanpage Facebook của BCshop là gì?
        A: https://m.me/myshop.vn/

        Q: Mình muốn tư vấn trực tiếp, hotline của bạn là gì?
        A: Hotline: 0988 888 888 (Mr. Bac)
        `,
      },
    ],
  },
  {
    title: "Nhân Đôi Ưu Đãi – Mừng Tết Quý Mão",
    author: "Vấp Cỏ Hôi Pen",
    type: "blog",
    slug: "nhan-doi-uu-dai-mung-tet-quy-mao",
    subContent:
      "Gấp đôi ưu đãi tặng Thiên Ngữ Hạc hoặc Lân Phát Tài Mini mừng Tết Quý Mão. Khuyến mãi diễn ra từ 11.1 đến 31.1 với hoá đơn từ 1tr và miễn phí giao hàng tận nơi",
    mainImage:
      "https://file.hstatic.net/200000417685/article/new-year-sale-2023-04_00a9e5ba4cba41ee8b024130deaf9d3a.jpg",
    content: [
      {
        id: "thoi-gian",
        title: "Thời gian",
        image: "",
        description: `Từ 11.1 đến hết ngày 31.1
        `,
      },
      {
        id: "noi-dung",
        title: "Nội dung chương trình",
        image: "",
        description: `Khi mua bất kì đơn hàng mô hình 3D tại BCshop.vn có giá trị từ <span class="font-semibold">1.099.000 đ</span> trở lên, bạn sẽ được tặng mô hình <span class="hover:text-primary">Thiên Ngữ Hạc</span> hoặc <span class="hover:text-primary">Lân Phát Tài Mini</span

        - Đơn hàng từ <span class="font-semibold">1.099.000 đ</span>, được tặng 1 mô hình kim loại 3D <span class="hover:text-primary">Thiên Ngữ Hạc</span> (trị giá <span class="font-semibold">200k</span>)

        - Đơn hàng từ <span class="font-semibold">1.799.000 đ</span>, được tặng 1 mô hình kim loại 3D <span class="hover:text-primary">Lân Phát Tài Mini</span> (trị giá <span class="font-semibold">270k</span>)

        Lưu ý: Thiên Ngữ Hạc và Lân Mini là dạng Blind Box, vì vậy chúng tôi sẽ giao màu ngẫu nhiên.

        Mỗi khách hàng chỉ được hưởng ưu đãi tặng Thiên Ngữ Hạc, Lân Mini tối đa 2 sản phẩm. Ví dụ: <span class="hover:text-primary">2x Thiên Ngữ Hạc</span> HOẶC <span class="hover:text-primary">2x Lân Mini</span> HOẶC <span class="hover:text-primary">1 Thiên Ngữ Hạc</span> và <span class="hover:text-primary">1 Lân Mini</span>

        Ngoài ra quý khách hàng sẽ được nhân đôi ưu đãi, hưởng thêm chính sách ưu đãi theo đơn hàng đang có tại BCshop.vn khi đơn hàng gốc từ 380K (không bao gồm sản phẩm giảm giá) trở lên. Nội dung chi tiết quý khách vui lòng xem tại đây: https://bcshop.vn/chinh-sach-uu-dai/
        `,
      },
      {
        id: "thong-tin-san-pham",
        title: "Thông tin sản phẩm áp dụng",
        image: "",
        description: `Tất cả sản phẩm được bày bán tại của hàng và website https://bcshop.vn
        `,
      },
      {
        id: "cach-thuc-dat-hang",
        title: "Các thức đặt hàng hợp lệ",
        image: "",
        description: `Giả sử đơn hàng gốc của quý khách sẽ mua là 1.200.000 đ. Quý khách được hưởng 2 ưu đãi:

        1. Quà tặng thuộc chương trình ưu đãi đơn hàng
        2. Nhân Đôi Ưu Đãi – Mừng Tết Quý Mão (tặng 2 Thiên Ngữ Hạc hoặc 1 Lân Mini)
        Quý khách vui lòng KHÔNG cho sản phẩm thuộc 2 chương trình trên vào giỏ hàng , tại mục Lưu ý của bước Thanh Toán. Quý khách vui lòng ghi:

        1. Quà tặng quý khách chọn thuộc Chương Trình Ưu Đãi đơn hàng. VD: Combo dụng cụ + mô hình mã MP123
        2. Thiên Ngữ Hạc, Lân Mini…
        BCshop.vn sẽ kiểm tra đơn hàng và điều chỉnh giá lại, sau đó sẽ xác nhận với quý khách hàng qua điện thoại hoặc Page Facebook

        Lưu ý: Giá trị đơn hàng áp dụng quà tặng Chương Trình Ưu Đãi sẽ bao gồm sản phẩm giảm giá
        `,
      },
      {
        id: "luu-y",
        title: "Lưu ý",
        image: "",
        description: `Quý khách hàng vui lòng liên hệ nhân viên của BCshop.vn để kiểm tra tình trạng còn hàng của các sản phẩm thông qua Fanpage Facebook https://m.me/myshop.vn/ hoặc qua Hotline: 0988 888 888 (Mr. Bac)
        Quý khách hàng vui lòng quay phim khi unbox sản phẩm, chúng tôi sẽ không giải quyết bất kỳ khiếu nại nào nếu không có video
        `,
      },
      {
        id: "cau-hoi-thuong-gap",
        title: "Câu hỏi thường gặp",
        image: "",
        description: `Q: Đơn gốc của mình trên 290k có được miễn ship không? <br />
        A: Có

        Q: Đơn gốc của mình có được áp dụng chương trình ưu đãi theo giá trị đơn hàng không (https://mys
        A: Có

        Q: Đơn gốc của mình giá trị cao, có được tặng nhiều Thiên Ngữ Hạc và Lân Mini không?
        A: Mỗi khách hàng chỉ được hưởng ưu đãi tặng Chậu Hoa Nhỏ, Thiên Ngữ Hạc, Lân Mini tối đa 2 sản phẩm. Ví dụ: 2x Thiên Ngữ Hạc HOẶC 2x Lân Mini HOẶC 1 Thiên Ngữ Hạc và 1 Lân Mini

        Q: Chương trình có tích điểm AP cho mình không?
        A: Có

        Q: Fanpage Facebook của BCshop là gì?
        A: https://m.me/myshop.vn/

        Q: Mình muốn tư vấn trực tiếp, hotline của bạn là gì?
        A: Hotline: 0988 888 888 (Mr. Bac)
        `,
      },
    ],
  },
  {
    title: "Hình thức thanh toán",
    author: "",
    type: "policy",
    slug: "hinh-thuc-thanh-toan",
    subContent: "",
    mainImage: "",
    content: [
      {
        id: "1",
        title: "Phương thức thanh toán tại chỗ",
        image: "",
        description: `Đây là hình thức phổ biến thường được khách hàng tại Tp. Hồ Chí Minh áp dụng khi đến mua hàng tại shop Art Puzzle. Với hình thức này các bạn sẽ tận mắt thấy những mô hình đã đăng trên website và facebook của Art Puzzle.`,
      },
      {
        id: "2",
        title: "Phương thức thanh toán trước",
        image: "",
        description: `Khách hàng sử dụng hình thức này sẽ nhận được thông tin chuyển khoản sau khi đặt đơn hàng thành công.
        Nội dung chuyển tiền với cú pháp sau: [Họ tên] mua [danh sách mã sản phẩm] hoặc [mã đơn hàng]
        Ví dụ: Nguyễn Văn A mua MP001, MP002, 2xMP003 … với 2x là số lượng 1 sản phẩm muốn mua.
        `,
      },
      {
        id: "3",
        title: "Phương thức thanh toán qua VNPay",
        image: "",
        description: `Khách hàng lựa chọn quét mã QR hoặc nhập thông tin thẻ thông qua VNPay để thanh toán đơn hàng.`,
      },
      {
        id: "4",
        title: "Phương thức thanh toán COD",
        image: "",
        description: `COD (Cash on delivery) là phương thức nhận hàng rồi mới thanh toán, cũng là một phương thức được ưa chuộng nhất hiện nay. Ưu điểm của phương thức này là các bạn sẽ thanh toán chỉ khi nhận được hàng (bao gồm chi phí mua hàng + phí ship). `,
      },
    ],
  },
  {
    title: "Chính sách giao hàng",
    author: "",
    type: "policy",
    slug: "chinh-sach-giao-hang",
    subContent:
      "ArtPuzzle.vn luôn hướng đến việc cung cấp dịch vụ vận chuyển tốt nhất với mức phí cạnh tranh cho tất cả các đơn hàng mà quý khách đặt với chúng tôi. Chúng tôi hỗ trợ giao hàng trên toàn quốc với chính sách giao hàng cụ thể như sau",
    mainImage: "",
    content: [
      {
        id: "1",
        title: "Quy trình giao nhận hàng",
        image: "",
        description: `Art Puzzle hợp tác với những đơn vị vận chuyển đáng tin cậy để giao hàng trực tiếp đến quý khách trên phạm vi toàn quốc.
        Chúng tôi sử dụng dịch vụ Giao Hàng Tiết Kiệm theo tiêu chí, nhanh và rẻ. Đơn hàng của quý khách sẽ được liên hệ và giao tối đa trong 3 lần. Trường hợp lần đầu giao hàng không thành công, sẽ có nhân viên liên hệ để sắp xếp lịch giao hàng lần 2 và 3 với quý khách.
        Nếu không liên hệ được, chúng tôi sẽ cố gắng liên hệ lại trong 24 giờ tiếp theo (qua thư điện tử hoặc gọi trực tiếp). Trong trường hợp vẫn không thể liên hệ được hoặc không nhận được bất kì phản hồi nào từ phía quý khách, đơn hàng sẽ không còn hiệu lực.
        Tại thời điểm nhận hàng, quý khách có thể kiểm tra tình trạng, số lượng các sản phẩm trong đơn đặt hàng. Đối với các đơn hàng đã được thanh toán trước, quý khách vui lòng xuất trình giấy tờ tùy thân (CMND hay giấy phép lái xe…) để ghi nhận.
        `,
      },
      {
        id: "2",
        title: "Chi phí vận chuyển",
        image: "",
        description: `
        FREESHIP toàn quốc với đơn hàng có tổng giá trị thanh toán từ 290.000 đ trở lên.
        Đồng giá phí ship 25k cho mọi khu vực trên toàn quốc với đơn hàng có tổng giá trị thanh toàn ít hơn 290.000 đ.
        `,
      },
      {
        id: "3",
        title: "Thời gian giao nhận",
        image: "",
        description: `Art Puzzle sẽ vận chuyển hàng trong thời gian thỏa thuận khi quý khách thực hiện đầy đủ các thủ tục đặt hàng. Thời gian vận chuyển hàng trong vòng 2 – 3 ngày làm việc (không tính chủ nhật hay các ngày lễ Tết). Thời gian nhận hàng từ 1 - 2 ngày đối với nội thành Tp. Hồ Chí Minh và từ 3 - 5 ngày đối với tỉnh thành khác.
    Xin lưu ý rằng Art Puzzle bảo lưu quyền thay đổi thời gian giao hàng trong một số trường hợp bất khả kháng như thời tiết xấu, điều kiện giao thông không thuận lợi, xe hỏng trên đường giao hàng, trục trặc trong quá trình xuất hàng. Chúng tôi sẽ chủ động liên hệ với khách hàng để thông báo trong những trường hợp trên.
        `,
      },
    ],
  },
  {
    title: "Chính sách đổi trả",
    author: "",
    type: "policy",
    slug: "chinh-sach-doi-tra",
    subContent: "",
    mainImage: "",
    content: [
      {
        id: "1",
        title: "Điều kiện đổi trả",
        image: "",
        description: `Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng ngay tại thời điểm giao/nhận hàng trong những trường hợp sau:
        - Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.
        - Không đủ số lượng, không đủ bộ như trong đơn hàng.
        - Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…
        - Trường hợp Sheet thép/gỗ bị trùng lặp. Ví dụ: có 3 sheet mã A, B, C nhưng bạn nhận A, A, C thì shop sẽ gửi cho bạn Sheet B
        Khách hàng có trách nhiệm xuất trình Video và hình ảnh chứng minh sự thiếu sót trên để hoàn thành việc hoàn trả/đổi trả hàng hóa. 
        `,
      },
      {
        id: "2",
        title: "Quy trình về thời gian đổi trả",
        image: "",
        description: `- Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ.
        - Thời gian gửi chuyển trả sản phẩm: trong vòng 14 ngày kể từ khi nhận sản phẩm.
        - Địa điểm đổi trả sản phẩm: Khách hàng có thể mang hàng trực tiếp đến văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.
        - Chúng tôi không chấp nhận yêu cầu hoàn tiền dưới mọi hình thức
        `,
      },
      {
        id: "3",
        title: "Địa chỉ đổi trả",
        image: "",
        description: `- SĐT: 0908427608 (Mr. Khanh)
        - Địa chỉ: 23/36/18 Nguyễn Hữu Tiến, P. Tây Thạnh, Q. Tân Phú, Tp. Hồ Chí Minh
        Sau khi nhận được sản phẩm, Art Puzzle sẽ kiểm tra và đổi lại sản phẩm khác cho quý khách
        `,
      },
    ],
  },
  {
    title: "Điều khoản dịch vụ",
    author: "",
    type: "policy",
    slug: "dieu-khoan-dich-vu",
    subContent: "",
    mainImage: "",
    content: [
      {
        id: "1",
        title: "Giới thiệu",
        image: "",
        description: `Chào mừng quý khách hàng đến với website chúng tôi.
        Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách chấp nhận với những thay đổi đó.
        Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
        `,
      },
      {
        id: "2",
        title: "Hướng dẫn sử dụng website",
        image: "",
        description: `Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.
        Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.
        `,
      },
      {
        id: "3",
        title: "Thanh toán an toàn tiện lợi",
        image: "",
        description: `Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:
        Cách 1: Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán)
        Cách 2: Thanh toán sau (COD – giao hàng và thu tiền tận nơi)
        Cách 3: Thanh toán online qua thẻ tín dụng, chuyển khoản, MOMO
        `,
      },
    ],
  },
  {
    title: "Phân biệt chất lượng mô hình",
    author: "",
    type: "news",
    slug: "phan-biet-chat-luong-mo-hinh",
    subContent: `NHỮNG ĐIỂM KHÁC BIỆT GIỮA MÔ HÌNH CHẤT LƯỢNG CAO VÀ MÔ HÌNH TIÊU CHUẨN
    Đều là sản phẩm có thương hiệu nhưng mô hình nói chung lại được chia ra làm hai loại.
    Loại tiêu chuẩn được sản xuất từ nhà sản xuất không đạt tiêu chuẩn quốc tế. Sản phẩm 90% sao chép từ những nhà sản xuất chính hãng khác.
    Loại chất lượng cao (High Quality) được sản xuất đạt tiêu chuẩn quốc tế, chất lượng được đảm bảo và ổn định.
    <img class="w-full mx-auto" src="https://file.hstatic.net/200000417685/file/picture1_a20224a74c0143e788c9064122a94b9c_grande.png" alt="Phân biệt chất lượng mô hình" />
    Sự khác biệt giữa hai dòng sản phẩm này không nhiều, có thể nói là ‘kẻ tám lạng, người nữa cân’. Người thích sản phẩm hoàn hảo, bền đẹp không tì vết, không ngại chi tiền thì sẽ chọn sản phẩm tốt. Có tiền nhiều để làm gì? Người thích được trải nghiệm nhiều mô hình để thử ‘hành xác’ bản thân, sưu tầm đủ loại nhưng kinh tế hạn hẹp thì sẽ chọn loại tiêu chuẩn.
    Cho nên việc lựa chọn loại mô hình nào là tùy thuộc vào sở thích và nhu cầu người chơi chứ không phải chơi mô hình tiêu chuẩn là ‘kém sang’ còn chơi ‘hàng hiệu’ là ngầu nhé.
    Dưới đây là 6 điểm khác biệt mà bất kỳ người chơi nào cũng nên biết, từ đó xác định được mình nên chọn mô hình nào để chơi.
    <p>Chú thích:</p>
    <p>-HQ: Sản phẩm chất lượng cao (High Quality)</p>
    <p>-SD: Sản phẩm tiêu chuẩn (Standard)</p>`,
    mainImage: "",
    content: [
      {
        id: "1",
        title: "Bao bì nhãn dán",
        image: "https://static.zenmarket.jp/images/blog/kydi1kdp.rsm",
        description: `Mô hình chính hãng thường có bao bì chất lượng cao với hình ảnh rõ ràng và logo chi tiết, nổi bật. Hãy tìm nhãn dán và hình ảnh ba chiều chính hãng. Hàng giả có thể bỏ sót những chi tiết này hoặc sử dụng bản in chất lượng thấp hoặc bỏ sót hoàn toàn logo và hình ba chiều.
        Lưu ý rằng hình giả (bên phải) không có logo. Nó cũng có màu sắc không chính xác trên bao bì và dường như bị thiếu phụ kiện, cũng như tư thế hơi khác một chút. 
        `,
      },
      {
        id: "2",
        title: "Mức giá",
        image: "https://static.zenmarket.jp/images/blog/1ukb0dub.a4e",
        description: `Mức giá thấp bất thường sẽ là một dấu hiệu cảnh báo lớn. Số liệu xác thực được định giá theo chất lượng và độ hiếm của chúng, vì vậy nếu giao dịch có vẻ quá tốt thì có lẽ có gì đó không ổn. Bạn nên so sánh giá với các cửa hàng hoặc người bán tương tự để biết được giá trung bình của sản phẩm.
Mức giá thấp hơn nhiều so với giá trị thông thường là dấu hiệu rõ ràng về mô hình anime lậu.
        `,
      },
      {
        id: "3",
        title: "Chất lượng màu sơn",
        image: "https://static.zenmarket.jp/images/blog/utcjz044.lmr",
        description: `Các nhân vật chính hãng sử dụng sơn cao cấp và có công việc sơn tỉ mỉ phù hợp với các chi tiết của nhân vật như được thấy trên phương tiện truyền thông tương ứng của họ. Hàng giả thường có lớp sơn cẩu thả với màu sắc có thể lệch màu, quá sáng hoặc xỉn màu và lớp sơn có thể bị lem ra và dễ trầy xước. Lớp sơn không thẳng hàng, đặc biệt là ở các bộ phận chi tiết như mắt hoặc các phụ kiện nhỏ, là dấu hiệu thường gặp của hàng giả. Một điểm phổ biến khác là các mô hình thật có xu hướng có lớp hoàn thiện mờ trong khi phần lớn các mô hình giả có vẻ ngoài sáng bóng một cách bất thường.
        `,
      },
      {
        id: "4",
        title: "Các chi tiết và sự chính xác",
        image: "https://static.zenmarket.jp/images/blog/ihpjc2rd.3ss",
        description: `Hãy luôn so sánh con số, hình ảnh từ trang web của nhà sản xuất. Tỷ lệ không chính xác hoặc thiếu chi tiết là dấu hiệu rõ ràng của hàng giả. Việc thiếu chi tiết đẹp ở những nơi như tóc, bàn tay và các phụ kiện nhỏ cũng có thể là một điểm đáng lưu ý.
        Các đường nối và khớp nối trên các mô hình anime chính hãng thường được chà nhám cẩn thận, đồng thời sự kết nối giữa các bộ phận thường được thiết kế tốt và không gây chú ý.
        Đôi khi, chỉ nhìn lướt qua là không đủ để phân biệt mô hình chính hãng với mô hình giả. Vì nơi sản xuất thường được đặt tại Trung Quốc nên các mẫu chính hãng thường bị rò rỉ cho những kẻ lừa đảo. Đây là lý do tại sao ngày nay rất khó phân biệt với bản chính hãng và chúng tốn rất nhiều tiền. `,
      },
    ],
  },
  {
    title: "Dụng cụ lắp ráp",
    author: "",
    type: "news",
    slug: "dung-cu-lap-rap",
    subContent: `Chúng ta cần chuẩn bị những dụng cụ bên dưới để lắp ráp mô hình kim loại 3D
      <img src="https://static.zenmarket.jp/images/blog/1ukb0dub.a4e" alt="Dụng cụ lắp ráp" />`,
    mainImage: "",
    content: [
      {
        id: "1",
        title: "Kềm cắt kim loại",
        image: "https://static.zenmarket.jp/images/blog/1ukb0dub.a4e",
        description: `Đây là dụng cụ cần thiết đầu tiên để giúp các bạn tách những mảnh ghép nhỏ từ miếng kim loại ra. Các bạn nên mua loại đầu nhỏ mà nhọn, sắc để dễ dàng luồn vào các khe của miếng ghép nhé. Một điểm nữa là bạn nên chọn loại nào có tay nắm cao su chống trượt để sử dụng một cách êm ái và không bị tuột tay.
        Nếu bạn không tìm thấy tại những cửa hiệu trên thì có thể sử dụng kềm cắt móng tay của nữ như 1 biện pháp tạm thời.
        `,
      },
      {
        id: "2",
        title: "Kềm mũi nhọn",
        image: "https://static.zenmarket.jp/images/blog/1ukb0dub.a4e",
        description: `Loại kềm này có các đặc điểm sau: mũi nhọn, được làm bằng thép, nên sử dụng loại có mũi cực nhọn, nhỏ, có tay nắm cao su chống trược để sử dụng một cách êm ái.
        Sử dụng kêm nhọn khi bạn cần bẻ khớp, khóa khớp hoặc điều chỉnh độ cong, thẳng, nghiêng của mảnh ghép.`,
      },
      {
        id: "3",
        title: "Nhíp",
        image: "https://static.zenmarket.jp/images/blog/1ukb0dub.a4e",
        description: `Đây có lẽ là công cụ dễ tìm nhất mà nhà nào cũng có, bạn có thể sử dụng nhíp nhổ tọc hoặc nhíp loại bự để nhổ lông con gà, heo cũng được. Công dụng của công cụ này giúp bẻ những khớp tại những vị trí khó khăn mà kềm nhọn không thể làm được hoặc điều chỉnh độ nghiêng, thẳng, cong của miếng ghép một cách linh hoạt.`,
      },
      {
        id: "4",
        title: "Dụng cụ uốn cong",
        image: "https://static.zenmarket.jp/images/blog/1ukb0dub.a4e",
        description: `Đây có thể được coi là phần khó nhất của mô hình kim loại lắp ráp 3D. Để có được 1 sản phẩm đẹp, không tì vết thì những phần uốn cong được xem như cuộc chiến của hầu hết các Artist. Bạn có thể xử dụng thân bút bi, cây ăng ten… làm công cụ. `,
      },
    ],
  },
  {
    title: "Câu hỏi thường gặp",
    author: "",
    type: "news",
    slug: "cau-hoi-thuong-gap",
    subContent: `Bạn có thắc mắc về việc mua hàng? Bạn có thể tham khảo các trường hợp hay gặp dưới đây
Trải qua thời gian hình thành và phát triển Art Puzzle đã trở thành một thương hiệu mô hình lắp ráp 3D kim loại, gỗ, nhựa non Lego, nhiều người yêu thích và chọn lựa. Hiện nay, thương hiệu Art Puzzle đã phát triển mạnh mẽ trên toàn quốc và website bán hàng trực tuyến thân thiện, chuyên nghiệp hàng đầu Việt Nam. Không dừng lại ở đó, dịch vụ của Art Puzzle luôn mang đến sự hài lòng và quyền lợi của khách hàng luôn được đáp ứng, thoả mãn…`,
    mainImage:
      "https://file.hstatic.net/200000417685/file/faq-background_4101b5c1069f403a8df9db2f36b47bd5_grande.jpg",
    content: [
      {
        id: "1",
        title: "Làm thế nào để tôi đặt hàng online?",
        image: "",
        description: `Art Puzzle rất vui lòng hỗ trợ khách hàng đặt hàng online bằng một trong những cách đặt hàng sau:
- Truy cập trang web: Art Puzzle
- Gửi email đặt hàng về địa chỉ: artpuzzlevn@gmail.com
- Liên hệ số hotline: 0988.891.692 để đặt sản phẩm
- Chat với tư vấn viên trên fanpage của Art Puzzle
        `,
      },
      {
        id: "2",
        title: "Nếu tôi đặt hàng trực tuyến có rủi ro gì không",
        image: "",
        description: `Với Art, khách hàng không phải lo lắng, vì chúng tôi cam kết cung cấp sản phẩm chất lượng tốt, giá cả phải chăng. Đặc biệt, khách hàng sẽ nhận được sản phẩm và thanh toán cùng một thời điểm.
        `,
      },
      {
        id: "3",
        title:
          "Nếu tôi mua sản phẩm với số lượng lớn thì có được giảm giá không",
        image: "",
        description: `Khi mua hàng với số lượng nhiều khách hàng sẽ được hưởng chế độ ưu đãi, giảm giá ngay tại thời điểm mua hàng.
Khách hàng vui lòng liên hệ Art để được hỗ trợ trực tiếp qua số điện thoại: 0988.891.692
        `,
      },
      {
        id: "4",
        title: "Tôi có được đổi sản phẩm mới hay trả tiền không",
        image: "",
        description: `Khi hàng hoá thoả điều kiện đổi/ trả, khách sẽ được đổi trả trường hợp trả hàng hoặc đổi hàng có giá trị thấp hơn.
Art không hỗ trợ hoàn tiền trong trường hợp này.
        `,
      },
    ],
  },
];
const orderData = [
  {
    user: "6847ae28161a6b9005b519ee", //backoi
    items: [
      {
        product: "6845c9e383bc5a610cf976a9",
        quantity: 1,
        price: 250000,
      },
      {
        product: "6845c9e383bc5a610cf976b5",
        quantity: 2,
        price: 280000,
      },
    ],
    totalAmount: 810000,
    shipAddress: {
      fullName: "Bắc",
      street: "123 xyz",
      ward: "xã Sơn Tây",
      district: "Huyện Hương Sơn",
      city: "Hà Tĩnh",
      phone: "0988888888",
    },
    shipOption: "standard", // standard, express
    status: "shipping", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "vnpay", // cash, vnpay, bank_transfer
    paymentStatus: "completed", // pending, completed, failed, refunded
    notes: "goi dien truoc khi giao",
  },
  {
    user: "6847ae28161a6b9005b519ee", //backoi
    items: [
      {
        product: "6845c9e383bc5a610cf976b3",
        quantity: 1,
        price: 149000,
      },
      {
        product: "6845c9e383bc5a610cf976b4",
        quantity: 1,
        price: 290000,
      },
    ],
    totalAmount: 439000,
    shipAddress: {
      fullName: "Le bac",
      street: "123 abc",
      ward: "Sơn Tây",
      district: "Huyện Hương Sơn",
      city: "Hà Tĩnh",
      phone: "0988888888",
    },
    shipOption: "express", // standard, express
    status: "shipping", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "bank_transfer", // cash, vnpay, bank_transfer
    paymentStatus: "completed", // pending, completed, failed, refunded
    notes: "giao buoi trua",
  },
  {
    user: "6847ae28161a6b9005b519ee",
    items: [
      {
        product: "6845c9e383bc5a610cf976cd",
        quantity: 2,
        price: 51000,
      },
      {
        product: "6845c9e383bc5a610cf976cc",
        quantity: 1,
        price: 190000,
      },
      {
        product: "6845c9e383bc5a610cf976ce",
        quantity: 1,
        price: 130000,
      },
      {
        product: "6845c9e383bc5a610cf976cb",
        quantity: 2,
        price: 180000,
      },
    ],
    totalAmount: 782000,
    shipAddress: {
      fullName: "Nguyễn Văn A",
      street: "123 Thôn A",
      ward: "Trường Yên",
      district: "Hoa Lư",
      city: "Ninh bình",
      phone: "0988888888",
    },
    shipOption: "standard", // standard, express
    status: "processing", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "bank_transfer", // cash, vnpay, bank_transfer
    paymentStatus: "refunded", // pending, completed, failed, refunded
    notes: "",
  },
  {
    user: "6847ae28161a6b9005b519ee",
    items: [
      {
        product: "6845c9e383bc5a610cf976ca",
        quantity: 1,
        price: 80000,
      },
      {
        product: "6845c9e383bc5a610cf976c9",
        quantity: 2,
        price: 160000,
      },
      {
        product: "6845c9e383bc5a610cf976c8",
        quantity: 1,
        price: 119000,
      },
    ],
    totalAmount: 459000,
    shipAddress: {
      fullName: "John Doe",
      street: "123 abc",
      ward: "Sơn Tây",
      district: "Hòa Lạc",
      city: "Hà Nội",
      phone: "0988876023",
    },
    shipOption: "standard", // standard, express
    status: "delivered", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "cash", // cash, vnpay, bank_transfer
    paymentStatus: "completed", // pending, completed, failed, refunded
    notes: "giao hang vao buoi sang",
  },
  {
    user: "6847ae28161a6b9005b519ee",
    items: [
      {
        product: "6845c9e383bc5a610cf976c6",
        quantity: 2,
        price: 15000,
      },
      {
        product: "6845c9e383bc5a610cf976c7",
        quantity: 2,
        price: 120000,
      },
    ],
    totalAmount: 156000,
    shipAddress: {
      fullName: "Vũ Như Quỳnh",
      street: "ấp 6",
      ward: "Xã Vĩnh Lộc",
      district: "Huyện Bình Chánh",
      city: "Thành phố Hồ Chí Minh",
      phone: "0988876023",
    },
    shipOption: "express", // standard, express,fast
    status: "delivered", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "cash", // cash, vnpay, bank_transfer
    paymentStatus: "completed", // pending, completed, failed, refunded
    notes: "ba ngoai nhan hang",
  },
  {
    user: "6847ae28161a6b9005b519ee",
    items: [
      {
        product: "6845c9e383bc5a610cf976c5",
        quantity: 1,
        price: 190000,
      },
    ],
    totalAmount: 195900,
    shipAddress: {
      fullName: "Lê Bắc",
      street: "xóm Tân Thủy",
      ward: "xã Sơn Tây",
      district: "huyện Hương Sơn",
      city: "Hà Tĩnh",
      phone: "0988888888",
    },
    shipOption: "fast", // standard, express
    status: "pending", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "cash", // cash, vnpay, bank_transfer
    paymentStatus: "pending", // pending, completed, failed, refunded
    notes: "gui hang ong hang xom",
  },
  {
    user: "6847ae28161a6b9005b519ee",
    items: [
      {
        product: "6845c9e383bc5a610cf976c3",
        quantity: 1,
        price: 290000,
      },

      {
        product: "6845c9e383bc5a610cf976c4",
        quantity: 1,
        price: 290000,
      },
      {
        product: "6845c9e383bc5a610cf976c2",
        quantity: 2,
        price: 219000,
      },
    ],
    totalAmount: 1237000,
    shipAddress: {
      fullName: "John Doe",
      street: "123 abc",
      ward: "Sơn Tây",
      district: "Hòa Lạc",
      city: "Hà Nội",
      phone: "0988876023",
    },
    shipOption: "fast", // standard, express
    status: "processing", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "vnpay", // cash, vnpay, bank_transfer
    paymentStatus: "completed", // pending, completed, failed, refunded
    notes: "goi dien thoai truoc khi giao",
  },
  {
    user: "6847ae28161a6b9005b519ee",
    items: [
      {
        product: "6845c9e383bc5a610cf976bf",
        quantity: 1,
        price: 169000,
      },
      {
        product: "6845c9e383bc5a610cf976be",
        quantity: 3,
        price: 30000,
      },
    ],
    totalAmount: 299000,
    shipAddress: {
      fullName: "backoi",
      street: "123 abc",
      ward: "Sơn Tây",
      district: "Huyện Hương Sơn",
      city: "Hà Tĩnh",
      phone: "0984121333",
    },
    shipOption: "express", // standard, express
    status: "pending", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "cash", // cash, vnpay, bank_transfer
    paymentStatus: "pending", // pending, completed, failed, refunded
    notes: "giao hang buoi sang",
  },

  {
    user: "6847ae28161a6b9005b519ee", //backoi
    items: [
      {
        product: "6845c9e383bc5a610cf976bd",
        quantity: 1,
        price: 129000,
      },
    ],
    totalAmount: 132000,
    shipAddress: {
      fullName: "Le bac",
      street: "123 abc",
      ward: "Sơn Tây",
      district: "Huyện Hương Sơn",
      city: "Hà Tĩnh",
      phone: "0982631878",
    },
    shipOption: "express", // standard, express
    status: "cancelled", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "cash", // cash, vnpay, bank_transfer
    paymentStatus: "refunded", // pending, completed, failed, refunded
    notes: "goi dien truoc khi giao",
  },
  {
    user: "6847ae28161a6b9005b519ee", //backoi
    items: [
      {
        product: "6845c9e383bc5a610cf976ba",
        quantity: 1,
        price: 20000,
      },
      {
        product: "6845c9e383bc5a610cf976bb",
        quantity: 1,
        price: 249000,
      },
      {
        product: "6845c9e383bc5a610cf976b9",
        quantity: 2,
        price: 49000,
      },
      {
        product: "6845c9e383bc5a610cf976bc",
        quantity: 1,
        price: 209000,
      },
    ],
    totalAmount: 520000,
    shipAddress: {
      fullName: "Bắc",
      street: "123 xyz",
      ward: "Tứ Hiệp",
      district: "Thanh Trì",
      city: "Hà Nội",
      phone: "0967803555",
    },
    shipOption: "standard", // standard, express
    status: "delivered", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "vnpay", // cash, vnpay, bank_transfer
    paymentStatus: "completed", // pending, completed, failed, refunded
    notes: "",
  },
  {
    user: "6847ae28161a6b9005b519ee", //backoi
    items: [
      {
        product: "6845c9e383bc5a610cf976b7",
        quantity: 1,
        price: 99000,
      },
      {
        product: "6845c9e383bc5a610cf976b6",
        quantity: 2,
        price: 100000,
      },
    ],
    totalAmount: 299000,
    shipAddress: {
      fullName: "Bắc",
      street: "123 xyz",
      ward: "Tứ Hiệp",
      district: "Thanh Trì",
      city: "Hà Nội",
      phone: "0967803555",
    },
    shipOption: "fast", // standard, express
    status: "shipping", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "cash", // cash, vnpay, bank_transfer
    paymentStatus: "pending", // pending, completed, failed, refunded
    notes: "giao vao gio hanh chinh",
  },
  {
    user: "6847ae28161a6b9005b519ee", //backoi
    items: [
      {
        product: "6845c9e383bc5a610cf976b5",
        quantity: 1,
        price: 280000,
      },
      {
        product: "6845c9e383bc5a610cf976b4",
        quantity: 1,
        price: 290000,
      },

      {
        product: "6845c9e383bc5a610cf976a7",
        quantity: 3,
        price: 150000,
      },
    ],
    totalAmount: 720000,
    shipAddress: {
      fullName: "Bắc",
      street: "123 xyz",
      ward: "xã Sơn Tây",
      district: "Huyện Hương Sơn",
      city: "Hà Tĩnh",
      phone: "086752311",
    },
    shipOption: "express", // standard, express
    status: "delivered", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "cash", // cash, vnpay, bank_transfer
    paymentStatus: "completed", // pending, completed, failed, refunded
    notes: "sau 4h chieu giao",
  },
  {
    user: "6847ae28161a6b9005b519ee", //backoi
    items: [
      {
        product: "6845c9e383bc5a610cf976b3",
        quantity: 1,
        price: 149000,
      },
      {
        product: "6845c9e383bc5a610cf976b2",
        quantity: 1,
        price: 180000,
      },
    ],
    totalAmount: 329000,
    shipAddress: {
      fullName: "Bắc",
      street: "123 xyz",
      ward: "xã Sơn Tây",
      district: "Huyện Hương Sơn",
      city: "Hà Tĩnh",
      phone: "0988888888",
    },
    shipOption: "standard", // standard, express
    status: "pending", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "bank_transfer", // cash, vnpay, bank_transfer
    paymentStatus: "completed", // pending, completed, failed, refunded
    notes: "giao vao chu nhat",
  },

  {
    user: "6847ae28161a6b9005b519ee", //backoi
    items: [
      {
        product: "6845c9e383bc5a610cf976ae",
        quantity: 1,
        price: 250000,
      },
      {
        product: "6845c9e383bc5a610cf976b1",
        quantity: 3,
        price: 35000,
      },
    ],
    totalAmount: 355000,
    shipAddress: {
      fullName: "Nguyễn Văn A",
      street: "17E Đường d27",
      ward: "Hòa Phú",
      district: "Thủ Dầu Một",
      city: "Bình Dương",
      phone: "0988321141",
    },
    shipOption: "fast", // standard, express
    status: "cancelled", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "cash", // cash, vnpay, bank_transfer
    paymentStatus: "failed", // pending, completed, failed, refunded
    notes: "gio hanh chinh",
  },
  {
    user: "6847ae28161a6b9005b519ee", //backoi
    items: [
      {
        product: "6845c9e383bc5a610cf976ac",
        quantity: 2,
        price: 25000,
      },
      {
        product: "6845c9e383bc5a610cf976ab",
        quantity: 2,
        price: 250000,
      },
      {
        product: "6845c9e383bc5a610cf976aa",
        quantity: 1,
        price: 259000,
      },
      {
        product: "6845c9e383bc5a610cf976a9",
        quantity: 1,
        price: 250000,
      },
    ],
    totalAmount: 809000,
    shipAddress: {
      fullName: "Nguyễn Văn A",
      street: "17E Đường d27",
      ward: "Hòa Phú",
      district: "Thủ Dầu Một",
      city: "Bình Dương",
      phone: "0988321141",
    },
    shipOption: "express", // standard, express
    status: "delivered", // pending, processing, shipping, delivered, cancelled
    paymentMethod: "cash", // cash, vnpay, bank_transfer
    paymentStatus: "completed", // pending, completed, failed, refunded
    notes: "giao buoi trua",
  },
  // {
  //   user: "6847ae5d161a6b9005b519f4", //admin
  //   items: [
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //   ],
  //   totalAmount: 100000,
  //   shipAddress: {
  //     fullName: "John Doe",
  //     street: "123 abc",
  //     ward: "Hòa Phú",
  //     district: "Thủ Dầu Một",
  //     city: "Bình Dương",
  //   },
  //   shipOption: "fast", // standard, express
  //   status: "delivered", // pending, processing, shipping, delivered, cancelled
  //   paymentMethod: "vnpay", // cash, vnpay, bank_transfer
  //   paymentStatus: "completed", // pending, completed, failed, refunded
  //   notes: "giao buoi trua",
  // },
  // {
  //   user: "6847ae5d161a6b9005b519f4", //admin
  //   items: [
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //   ],
  //   totalAmount: 100000,
  //   shipAddress: {
  //     fullName: "John Doe",
  //     street: "123 abc",
  //     district: "Sơn Tây",
  //     ward: "Hòa Lạc",
  //     city: "Hà Nội",
  //   },
  //   shipOption: "standard", // standard, express
  //   status: "pending", // pending, processing, shipping, delivered, cancelled
  //   paymentMethod: "cash", // cash, vnpay, bank_transfer
  //   paymentStatus: "pending", // pending, completed, failed, refunded
  //   notes: "test",
  // },
  // {
  //   user: "6847ae5d161a6b9005b519f4", //admin
  //   items: [
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //   ],
  //   totalAmount: 100000,
  //   shipAddress: {
  //     fullName: "John Doe",
  //     street: "123 abc",
  //     district: "Sơn Tây",
  //     ward: "Hòa Lạc",
  //     city: "Hà Nội",
  //   },
  //   shipOption: "standard", // standard, express
  //   status: "pending", // pending, processing, shipping, delivered, cancelled
  //   paymentMethod: "cash", // cash, vnpay, bank_transfer
  //   paymentStatus: "pending", // pending, completed, failed, refunded
  //   notes: "test",
  // },
  // {
  //   user: "6847ae5d161a6b9005b519f4", //admin
  //   items: [
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //     {
  //       product: "",
  //       quantity: 1,
  //       price: 100000,
  //     },
  //   ],
  //   totalAmount: 100000,
  //   shipAddress: {
  //     fullName: "John Doe",
  //     street: "123 abc",
  //     district: "Sơn Tây",
  //     ward: "Hòa Lạc",
  //     city: "Hà Nội",
  //   },
  //   shipOption: "standard", // standard, express
  //   status: "pending", // pending, processing, shipping, delivered, cancelled
  //   paymentMethod: "cash", // cash, vnpay, bank_transfer
  //   paymentStatus: "pending", // pending, completed, failed, refunded
  //   notes: "test",
  // },
];

const seedData = async () => {
  try {
    // Xóa dữ liệu cũ
    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Product.deleteMany();
    await Post.deleteMany();
    await Brand.deleteMany();

    // Thêm bài viết
    const posts = await Post.insertMany(postData);
    console.log("✅ Bài viết đã được chèn!");

    // Thêm hãng
    const brands = await Brand.insertMany(brandsData);
    console.log("✅ Hãng đã được chèn!");

    //Thêm order
    // const orders = await Order.insertMany(orderData);
    // console.log("✅ Đơn hàng đã được chèn!");

    // Thêm danh mục chính
    const categories = await Category.insertMany(categoriesData);
    console.log("✅ Danh mục đã được chèn!");

    // Map categorySlug -> ObjectId
    const categoryMap = {};
    categories.forEach((category) => {
      categoryMap[category.slug] = category._id;
    });

    // Thêm danh mục con (tham chiếu đến categoryId)
    const subCategories = await SubCategory.insertMany(
      subCategoriesData.map((sub) => ({
        slug: sub.slug,
        name: sub.name,
        category: categoryMap[sub.category],
      }))
    );
    console.log("✅ Danh mục con đã được chèn!");

    // Map subCategoryName -> ObjectId
    const subCategoryMap = {};
    subCategories.forEach((sub) => {
      subCategoryMap[sub.name] = sub._id;
    });

    // Map brandName -> ObjectId
    const brandMap = {};
    brands.forEach((brand) => {
      brandMap[brand.name] = brand._id;
    });

    // Chuẩn bị dữ liệu sản phẩm để insert
    const productsToInsert = productsData.map((product) => {
      // Xử lý trường image: đảm bảo luôn là mảng
      let images = [];
      if (Array.isArray(product.image)) {
        images = product.image;
      } else if (typeof product.image === "string") {
        images = [product.image];
      }

      return {
        productId: product.productId,
        name: product.name,
        slug: product.slug,
        price: product.price,
        stock: product.stock,
        difficulty: product.difficulty,
        pieces: product.pieces,
        dimensions: {
          width: product.width,
          height: product.height,
          length: product.length,
        },
        brand: brandMap[product.brandName],
        video: product.video,
        category: categoryMap[product.categorySlug],
        subCategories: product.subCategoryName
          .map((name) => subCategoryMap[name])
          .filter((id) => id), // Lọc bỏ các id null
        description: product.description,
        images: images,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    // Thêm sản phẩm
    await Product.insertMany(productsToInsert);
    console.log(`✅ ${productsToInsert.length} sản phẩm đã được chèn!`);

    process.exit();
  } catch (error) {
    console.error("❌ Lỗi khi chèn dữ liệu:", error);
    process.exit(1);
  }
};
// Chạy hàm
seedData();

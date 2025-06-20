const express = require("express");
const router = express.Router();
//fix loc du lieu
const Product = require("../models/Product");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Brand = require("../models/Brand");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

// API Thêm sản phẩm
router.post("/", async (req, res) => {
  try {
    const {
      productCode,
      name,
      price,
      images,
      category,
      subCategories,
      description,
      stock,
    } = req.body;

    if (!["figure", "assemble"].includes(category)) {
      return res.status(400).json({ message: "Danh mục không hợp lệ" });
    }

    const newProduct = new Product({
      productCode,
      name,
      price,
      images,
      category,
      subCategories,
      description,
      stock,
    });
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Thêm sản phẩm thành công", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});
//sale page
router.get("/collections/big-sale", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Product.find({ price: { $lte: 100000 } })
      .populate("category subCategories brand")
      .skip((page - 1) * limit)
      .limit(limit);
    const totalProducts = await Product.countDocuments({ isSale: true });
    const totalPages = Math.ceil(totalProducts / limit);
    res.json({
      products,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});
router.get("/collections/:category?", async (req, res) => {
  try {
    let baseQuery = {};
    const { category } = req.params;

    //console.log("params: ", category);
    const { subCategories, maxPrice, minRating, page, limit } = req.query;

    //console.log("category: ", category);
    //console.log("subCategories: ", subCategories);

    // Nếu có category => lọc theo category chính
    // Dựa vào tên category để tìm id tương ứng
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      const subCategoryDoc = await SubCategory.findOne({ slug: category });
      const brandDoc = await Brand.findOne({ slug: category });
      if (!categoryDoc && !subCategoryDoc && !brandDoc) {
        return res.status(404).json({ message: "Không tìm thấy danh mục" });
      }
      // return res.status(400).json({ message: "Danh mục không hợp lệ" });
      baseQuery = categoryDoc
        ? { category: categoryDoc._id }
        : subCategoryDoc
        ? {
            subCategories: subCategoryDoc._id,
          }
        : {
            brand: brandDoc._id,
          };
    }
    // Nếu có subCategories => lọc theo danh sách sub
    // Dựa vào tên subCategories để tìm id tương ứng
    if (subCategories) {
      const subIds = await SubCategory.find({
        slug: { $in: subCategories.split(",") },
      });
      baseQuery.subCategories = {
        $in: subIds.map((sc) => sc._id),
      };
    }
    //them gia tri maxPrice va minRating
    if (maxPrice) {
      baseQuery.price = { $lte: maxPrice };
    }
    // tạm thời không lọc theo rating
    // if (minRating) {
    //   baseQuery.rating = { $gte: minRating };
    // }
    const products = await Product.find(baseQuery)
      .populate("category subCategories brand")
      .skip((page - 1) * limit)
      .limit(limit);
    const totalProducts = await Product.countDocuments(baseQuery);
    const totalPages = Math.ceil(totalProducts / limit);
    res.json({
      products,
      totalPages,
    });
    //res.json(products);
    //res.json(categorySlug);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

// router.get("/collections/:category?", async (req, res) => {
//   try {
//     let baseQuery = {};
//     const { category } = req.params;
//     const { subCategories } = req.query;

//     console.log("category: ", category);
//     console.log("subCategories: ", subCategories);

//     // Nếu có subCategories => lọc theo danh sách sub
//     if (subCategories) {
//       const subCategorySlugs = subCategories.split(",");
//       const subCategoryDocs = await SubCategory.find({
//         slug: { $in: subCategorySlugs },
//       });

//       if (subCategoryDocs.length === 0) {
//         return res
//           .status(404)
//           .json({ message: "Không tìm thấy subCategories" });
//       }

//       baseQuery.subCategories = {
//         $in: subCategoryDocs.map((sc) => sc._id),
//       };
//     }
//     // Nếu không có subCategories mà có category => lọc theo category chính
//     else if (category && category !== "") {
//       const categoryDoc = await Category.findOne({ slug: category });
//       const subCategoryDoc = await SubCategory.findOne({ slug: category });

//       if (!categoryDoc && !subCategoryDoc) {
//         return res.status(404).json({ message: "Không tìm thấy danh mục" });
//       }

//       baseQuery = categoryDoc
//         ? { category: categoryDoc._id }
//         : { subCategories: subCategoryDoc._id };
//     }

//     // Nếu category = "all" hoặc không có => không cần điều kiện gì thêm

//     const products = await Product.find(baseQuery).populate(
//       "category subCategories"
//     );

//     res.json(products);
//   } catch (error) {
//     console.error("Lỗi khi lấy sản phẩm:", error);
//     res.status(500).json({ message: "Lỗi server", error: error.message });
//   }
// });

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    //console.log("q: ", query);
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    console.log("slug: ", slug);
    const product = await Product.findOne({ slug: slug });
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

module.exports = router;

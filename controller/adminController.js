import { Search } from "@mui/icons-material";
import asyncHandler from "express-async-handler";
import { client } from "../config/connect.js";
import { Products } from "../Model/AmazonKeepa.js";
import generatorToken from "../Util/JwtTockenGenerate.js";

export const keepaData = asyncHandler(async (req, res) => {
  console.log(req.body, "hloooooooooooooooooooooo");
  const {
    domainId,
    categoryId,
    brand,
    paginationToken,
    sortField,
    sortDirection,
    skip,
    maxPriceRange,
    maxRankRange,
    maxRevenueRange,
    maxTotalSellers,
    minPriceRange,
    minRankRange,
    minRevenueRange,
    minTotalSellers,
    colorCode,
    search,
  } = req.body;

  if (domainId == 0) {
    throw new Error("Please select marketplace.");
  }

  if (maxRevenueRange < minRevenueRange) {
    throw new Error(
      "Minimum revenue value cannot be more than the maximum value."
    );
  }

  if (categoryId == 0) {
    throw new Error("Please select a category.");
  }
  if (maxPriceRange < minPriceRange) {
    throw new Error(
      "Minimum price value cannot be more than the maximum value."
    );
  }
  if (maxRankRange < minRankRange) {
    throw new Error(
      "Minimum rank value cannot be more than the maximum value."
    );
  }
  if (maxTotalSellers < minTotalSellers) {
    throw new Error(
      "Minimum total sellers value cannot be more than the maximum value."
    );
  }

  let DMId = parseInt(domainId);
  let skipN = parseInt(skip);

  let proCount = await client
    .db("upscaleSaaS3")
    .collection("Products")
    .countDocuments({
      DomainId: DMId,
      ColorCode: colorCode,
      // "categoryTree.$.catId": categoryId,
    });

  let finPro = await client
    .db("upscaleSaaS3")
    .collection("Products")
    .aggregate([
      {
        $match: {
          DomainId: DMId,
          ColorCode: colorCode,
          "categoryTree.catId": categoryId,
        },
      },
    ])
    .skip(skipN)
    .limit(25)
    .toArray();

  let productResearchViewModel;

  if (search.length != 0) {
    let productFilter = finPro.filter((data) => {
      let text =
        data.brand && data.brand !== null && data.brand.includes(search);
      console.log(text, "searchsearchsearchsearch");
      if (text !== false && text !== null)
        return {
          amazonURL: `https://www.amazon.co.uk/dp/${data.Asin}?Psc=1`,
          asin: data.Asin,
          brand: data.brand,
          colorCode: data.ColorCode,
        };
    });

    productResearchViewModel = productFilter.map((data) => {
      const image = data.imagesCSV != null && data.imagesCSV.split(",");
      return {
        amazonURL: `https://www.amazon.co.uk/dp/${data.Asin}?Psc=1`,
        asin: data.Asin,
        brand: data.brand,
        colorCode: data.ColorCode,
        ean: data.eanList,
        estimatedRevenue: data.EstimatedRevenue,
        estimatedSales: data.EstimatedSales,
        image: `https://images-na.ssl-images-amazon.com/images/I/${image[0]}`,
        offerFBA: data.OfferFBA,
        offerFBM: data.OfferFBM,
        outOfStockPercentage: data.OutOfStockPercentage,
        price: data.TargetPrice,
        rank: data.Rank,
        targetPrice: data.TargetPrice,
        upc: data.upcList,
        productId: data.ProductId,
        totalSellers: data.TotalSellers,
        manufacturer: data.manufacturer,
        title: data.title,
        lastUpdate: data.lastUpdate,
        lastPriceChange: data.lastPriceChange,
        rootCategory: data.rootCategory,
        type: data.type,
        trackingSince: data.trackingSince,
        productGroup: data.productGroup,
        partNumber: data.partNumber,
        model: data.model,
        packageHeight: data.packageHeight,
        packageLength: data.packageLength,
        packageWidth: data.packageWidth,
        packageWeight: data.packageWeight,
        packageQuantity: data.packageQuantity,
        isAdultProduct: data.isAdultProduct,
        buyBoxSellerIdHistory: data.buyBoxSellerIdHistory,
        binding: data.binding,
        releaseDate: data.releaseDate,
        lastRatingUpdate: data.lastRatingUpdate,
        lastEbayUpdate: data.lastEbayUpdate,
        features: data.features,
        description: data.description,
        availabilityAmazon: data.availabilityAmazon,
        listedSince: data.listedSince,
      };
    });
  } else {
    productResearchViewModel = finPro.map((data) => {
      const image = data.imagesCSV != null && data.imagesCSV.split(",");
      return {
        amazonURL: `https://www.amazon.co.uk/dp/${data.Asin}?Psc=1`,
        asin: data.Asin,
        brand: data.brand,
        colorCode: data.ColorCode,
        ean: data.eanList,
        estimatedRevenue: data.EstimatedRevenue,
        estimatedSales: data.EstimatedSales,
        image: `https://images-na.ssl-images-amazon.com/images/I/${image[0]}`,
        offerFBA: data.OfferFBA,
        offerFBM: data.OfferFBM,
        outOfStockPercentage: data.OutOfStockPercentage,
        price: data.TargetPrice,
        rank: data.Rank,
        targetPrice: data.TargetPrice,
        upc: data.upcList,
        productId: data.ProductId,
        totalSellers: data.TotalSellers,
        manufacturer: data.manufacturer,
        title: data.title,
        lastUpdate: data.lastUpdate,
        lastPriceChange: data.lastPriceChange,
        rootCategory: data.rootCategory,
        type: data.type,
        trackingSince: data.trackingSince,
        productGroup: data.productGroup,
        partNumber: data.partNumber,
        model: data.model,
        packageHeight: data.packageHeight,
        packageLength: data.packageLength,
        packageWidth: data.packageWidth,
        packageWeight: data.packageWeight,
        packageQuantity: data.packageQuantity,
        isAdultProduct: data.isAdultProduct,
        buyBoxSellerIdHistory: data.buyBoxSellerIdHistory,
        binding: data.binding,
        releaseDate: data.releaseDate,
        lastRatingUpdate: data.lastRatingUpdate,
        lastEbayUpdate: data.lastEbayUpdate,
        features: data.features,
        description: data.description,
        availabilityAmazon: data.availabilityAmazon,
        listedSince: data.listedSince,
      };
    });
  }

  // ascending
  if (sortDirection === "asc") {
    productResearchViewModel.sort((a, b) => {
      if (sortField === "price") return a.price - b.price;
      if (sortField === "rank") return a.rank - b.rank;
      if (sortField === "outOfStockPercentage")
        return a.outOfStockPercentage - b.outOfStockPercentage;
      if (sortField === "estimatedSales")
        return a.estimatedSales - b.estimatedSales;
      if (sortField === "estimatedRevenue")
        return a.estimatedRevenue - b.estimatedRevenue;
    });
  }

  // descending
  if (sortDirection === "desc") {
    productResearchViewModel.sort((a, b) => {
      if (sortField === "price") {
        if (a.price > b.price) return -1;
      }
      if (sortField === "rank") {
        if (a.rank > b.rank) return -1;
      }
      if (sortField === "outOfStockPercentage") {
        if (a.outOfStockPercentage > b.outOfStockPercentage) return -1;
      }

      if (sortField === "estimatedSales") {
        if (a.estimatedSales > b.estimatedSales) return -1;
      }
      if (sortField === "estimatedRevenue") {
        if (a.estimatedRevenue > b.estimatedRevenue) return -1;
      }
      return 0;
    });
  }
  if (maxPriceRange !== null || minPriceRange !== null) {
    productResearchViewModel = productResearchViewModel.filter(function (x) {
      return x.price > minPriceRange && x.price < maxPriceRange;
    });
  }

  if (maxRankRange !== null || minRankRange !== null) {
    productResearchViewModel = productResearchViewModel.filter(function (x) {
      return x.rank > minRankRange && x.rank < maxRankRange;
    });
  }

  if (maxRevenueRange !== null || minRevenueRange !== null) {
    productResearchViewModel = productResearchViewModel.filter(function (x) {
      return (
        x.estimatedRevenue > minRevenueRange &&
        x.estimatedRevenue < maxRevenueRange
      );
    });
  }

  if (maxTotalSellers !== null || minTotalSellers !== null) {
    productResearchViewModel = productResearchViewModel.filter(function (x) {
      return (
        x.totalSellers > minTotalSellers && x.totalSellers < maxTotalSellers
      );
    });
  }
  res.json({
    paginationToken: {},
    productResearchViewModel,
    totalCount: proCount,
  });
});

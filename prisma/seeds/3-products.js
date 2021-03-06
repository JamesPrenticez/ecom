const products = [
  {
    id: "ckzywzytm00413svi6jezdk1o",
    name: "Polo Cotton Shirt",
    slug: "polo-cotton-shirt",
    category: "Shirts",
    images:  "[\"/images/shirts/shirt1/1.avif\", \"/images/shirts/shirt1/2.avif\", \"/images/shirts/shirt1/3.avif\", \"/images/shirts/shirt1/4.avif\", \"/images/shirts/shirt1/5.avif\", \"/images/shirts/shirt1/6.avif\"]",
    brand: "Lacrosse ",
    description: "Made in compact Oxford cotton authentic and durable, this shirt softens and becomes softer with each wash. This solid-coloured shirt has it all: a classic button-down collar, a patch pocket on the chest, and real mother-of-pearl buttons. Its available in several contemporary pastel colours and will look great with a V-neck sweater and raw rolled-up jeans.",
    price: 90.00,
    num_in_stock: 6,
    colors: "[{\"name\": \"Yellow\", \"icon\": \"/images/colors/yellow.svg\"}, {\"name\": \"Red\", \"icon\": \"/images/colors/red.svg\"}, {\"name\": \"Green\", \"icon\": \"/images/colors/green.svg\"}, {\"name\": \"Blue\", \"icon\": \"/images/colors/blue.svg\"}]",
    published: true,
  },
  {
    id: "cl00ep6zb0005eovi5oym6d8o",
    name: "Premium Cotton Shirt",
    slug: "premium-cotton-shirt",
    category: "Shirts",
    images:  "[\"/images/shirts/shirt2/1.avif\", \"/images/shirts/shirt2/2.avif\", \"/images/shirts/shirt2/3.avif\", \"/images/shirts/shirt2/4.avif\", \"/images/shirts/shirt2/5.avif\", \"/images/shirts/shirt2/6.avif\", \"/images/shirts/shirt2/7.avif\"]",
    brand: "Lacrosse ",
    description: "Pure, clean lines define this shirt which is available in 7 modern colours. Made in a high-end honeycombed fabric, a casual wash is applied for Lacoste sportswear DNA. It is embellished with genuine mother-of-pearl buttons and an iconic small green embroidered crocodile on the chest. Designed in the spirit of the iconic Lacoste piqué, this new essential is the perfect addition to your seasonal wardrobe.",
    price: 70.00,
    num_in_stock: 2,
    colors: "[{\"name\": \"Pink\", \"icon\": \"/images/colors/pink.svg\"}, {\"name\": \"Red\", \"icon\": \"/images/colors/red.svg\"}, {\"name\": \"Green\", \"icon\": \"/images/colors/green.svg\"}, {\"name\": \"Blue\", \"icon\": \"/images/colors/blue.svg\"}]",
    published: true,
  },
  {
    id: "cl00195lv00658gviriq5udt2",
    name: "Oxford Cotton Shirt",
    slug: "oxford-cotton-shirt",
    category: "Shirts",
    images:  "[\"/images/shirts/shirt3/1.avif\", \"/images/shirts/shirt3/2.avif\", \"/images/shirts/shirt3/3.avif\", \"/images/shirts/shirt3/4.avif\", \"/images/shirts/shirt3/5.avif\", \"/images/shirts/shirt3/6.avif\", \"/images/shirts/shirt3/7.avif\"]",
    brand: "Lacrosse ",
    description: "Made from high-quality Oxford cotton, this tailored shirt will be a stylish addition to your wardrobe. Elegant and comfortable, it is embellished with real mother-of-pearl buttons and features a rounded hem and a chest pocket. This cant-miss seasonal classic will look great with all your bottoms.",
    price: 90.00,
    num_in_stock: 4,
    colors: "[{\"name\": \"Red\", \"icon\": \"/images/colors/red.svg\"}, {\"name\": \"Green\", \"icon\": \"/images/colors/green.svg\"}, {\"name\": \"Blue\", \"icon\": \"/images/colors/blue.svg\"}]",
    published: true,
  },
  {
    id: "ckzyxktb501843sviv5w8g39i",
    name: "Lightweight Tracksuit Pants",
    slug: "lightweight-tracksuit-pants",
    category: "Pants",
    images:  "[\"/images/pants/pants1/1.avif\", \"/images/pants/pants1/2.avif\", \"/images/pants/pants1/3.avif\", \"/images/pants/pants1/4.avif\", \"/images/pants/pants1/5.avif\", \"/images/pants/pants1/6.avif\", \"/images/pants/pants1/7.avif\", \"/images/pants/pants1/8.avif\"]",
    brand: "Lacrosse ",
    description: "Step up with the athletic, high-performance allure of these signature tracksuit pants. Crafted in lightweight diamond taffeta and lined in soft jersey, they are equipped with an elasticised waistband, zip leg bottoms and concealed pockets. A Lacoste-lettered contrast band completes this trendy sport-infused look.",
    price: 110.00,
    num_in_stock: 30,
    colors: "[{\"name\": \"Red\", \"icon\": \"/images/colors/red.svg\"}, {\"name\": \"Green\", \"icon\": \"/images/colors/green.svg\"}, {\"name\": \"Blue\", \"icon\": \"/images/colors/blue.svg\"}]",
    published: true,
  },
  {
    id: "ckzzbq1nf000524vi1s1yeeuz",
    name: "Coloured SPORT Tracktrousers",
    slug: "coloured-sport-tracktrousers",
    category: "Pants",
    images:  "[\"/images/pants/pants2/1.avif\", \"/images/pants/pants2/2.avif\", \"/images/pants/pants2/3.avif\", \"/images/pants/pants2/4.avif\", \"/images/pants/pants2/5.avif\", \"/images/pants/pants2/6.avif\"]",
    brand: "Lacrosse ",
    description: "A colour-block band adorned with an oversized crocodile brings a striking touch to these Lacoste Sport tracktrousers. Made of a lightweight diamond and recycled woven material, the piece is equipped with practical pockets but also an elasticised waistband and ankles. Its athletic allure and perfect comfort puts you in the lead on all grounds.",
    price: 110.00,
    num_in_stock: 5,
    colors: "[]",
    published: true,
  },
  {
    id: "ckzyxh6of01453svii3bxf707",
    name: "Slim Fit Stretch Gabardine Chino Pants",
    slug: "slim-fit-stretch-gabardine-chino-pants",
    category: "Pants",
    images:  "[\"/images/pants/pants3/1.avif\", \"/images/pants/pants3/2.avif\", \"/images/pants/pants3/3.avif\", \"/images/pants/pants3/4.avif\", \"/images/pants/pants3/5.avif\", \"/images/pants/pants3/6.avif\"]",
    brand: "Lacrosse ",
    description: "Slim crafting in stretch gabardine with side pockets, these chino pants are an elegant take on a classic. Perfect with sneakers and a short-sleeved shirt.",
    price: 150.00,
    num_in_stock: 9,
    colors: "[{\"name\": \"Brown\", \"icon\": \"/images/colors/brown.svg\"}, {\"name\": \"Red\", \"icon\": \"/images/colors/red.svg\"}, {\"name\": \"Green\", \"icon\": \"/images/colors/green.svg\"}, {\"name\": \"Blue\", \"icon\": \"/images/colors/blue.svg\"}]",
    published: true,
  },
]

module.exports = {products}
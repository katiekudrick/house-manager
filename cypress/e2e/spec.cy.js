describe('Home Page Load Test', () => {
 it('Visits House Manager home page & loads table to view all items', () => {
  cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')

  cy.get('[id="view-category"]').click()
 })
})

// ______________________________________________________

describe('Open & Close Add Item Pop-Up Test', () => {
  it('Opens & closes pop-up window', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')

    cy.get('[id="add-item-btn"]').click()
 
    cy.get('[id="close-add-item"]').click()
  })
})

describe('Open & Complete Form Add Item Pop-Up Test', () => {
  it('Opens pop-up window & performs add item form completion sequence, add one item for each category', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')

    cy.get('[id="add-item-btn"]').click()

    // --- tops item
    cy.get("[id='add-item-cat']").select("Tops")
    cy.get("[id='add-item-type']").type("Long Sleeve Shirt")
    cy.get("[id='add-item-desc']").type("XL, Black, Relaxed Fit")
    cy.get("[id='add-item-vendor']").type("Old Navy")
    cy.get("[id='add-item-cost']").type("19.99")
    cy.get("[id='add-item-date']").type("2023-10-01")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")

    // --- bottoms item
    cy.get("[id='add-item-cat']").select("Bottoms")
    cy.get("[id='add-item-type']").type("Workout Leggings")
    cy.get("[id='add-item-desc']").type("XL, Black, 7/8 Length")
    cy.get("[id='add-item-vendor']").type("Old Navy")
    cy.get("[id='add-item-cost']").type("29.99")
    cy.get("[id='add-item-date']").type("2023-10-01")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")

    // --- dresses/ropmers item
    cy.get("[id='add-item-cat']").select("Dresses/Rompers")
    cy.get("[id='add-item-type']").type("Sweatshirt Dress")
    cy.get("[id='add-item-desc']").type("XL, Denim Blue, Oversized")
    cy.get("[id='add-item-vendor']").type("H & M")
    cy.get("[id='add-item-cost']").type("35.99")
    cy.get("[id='add-item-date']").type("2023-10-01")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")

    // --- outerwear item
    cy.get("[id='add-item-cat']").select("Outerwear")
    cy.get("[id='add-item-type']").type("Car Coat")
    cy.get("[id='add-item-desc']").type("XL, Wool, Camel, Zipper")
    cy.get("[id='add-item-vendor']").type("J.Crew")
    cy.get("[id='add-item-cost']").type("139.99")
    cy.get("[id='add-item-date']").type("2022-12-25")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")

    // --- shoes item
    cy.get("[id='add-item-cat']").select("Shoes")
    cy.get("[id='add-item-type']").type("Laced Boots")
    cy.get("[id='add-item-desc']").type("10W, Black, Slight Heel, Zipper")
    cy.get("[id='add-item-vendor']").type("Clarks")
    cy.get("[id='add-item-cost']").type("159.99")
    cy.get("[id='add-item-date']").type("2023-10-01")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")

    // --- bras item
    cy.get("[id='add-item-cat']").select("Bras")
    cy.get("[id='add-item-type']").type("Sports Bra")
    cy.get("[id='add-item-desc']").type("XL, Hot Pink, Square Neck")
    cy.get("[id='add-item-vendor']").type("Old Navy")
    cy.get("[id='add-item-cost']").type("13.99")
    cy.get("[id='add-item-date']").type("2023-10-01")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")

    // --- underwear item
    cy.get("[id='add-item-cat']").select("Underwear")
    cy.get("[id='add-item-type']").type("Briefs, Seamless")
    cy.get("[id='add-item-desc']").type("XL, Black, High Waisted")
    cy.get("[id='add-item-vendor']").type("Parade")
    cy.get("[id='add-item-cost']").type("9.99")
    cy.get("[id='add-item-date']").type("2023-07-13")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")

    // --- bathing suits item
    cy.get("[id='add-item-cat']").select("Bathing Suits")
    cy.get("[id='add-item-type']").type("One Piece")
    cy.get("[id='add-item-desc']").type("XL, Long Torso, Black, High Neck w/ Buttons")
    cy.get("[id='add-item-vendor']").type("Andie")
    cy.get("[id='add-item-cost']").type("99.99")
    cy.get("[id='add-item-date']").type("2023-07-07")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")

    // --- leisurewear item
    cy.get("[id='add-item-cat']").select("Leisurewear")
    cy.get("[id='add-item-type']").type("Sweatpants")
    cy.get("[id='add-item-desc']").type("XXL, Black, Baggy")
    cy.get("[id='add-item-vendor']").type("Old Navy")
    cy.get("[id='add-item-cost']").type("23.50")
    cy.get("[id='add-item-date']").type("2023-07-07")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")

    // --- skincare item
    cy.get("[id='add-item-cat']").select("Skincare")
    cy.get("[id='add-item-type']").type("Moisturizer")
    cy.get("[id='add-item-desc']").type("Naturium Glowy w/ SPF")
    cy.get("[id='add-item-vendor']").type("Target")
    cy.get("[id='add-item-cost']").type("19.99")
    cy.get("[id='add-item-date']").type("2023-10-03")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")

    // --- makeup item
    cy.get("[id='add-item-cat']").select("Makeup")
    cy.get("[id='add-item-type']").type("Skin Tint")
    cy.get("[id='add-item-desc']").type("ELF, Glowy, Ivory")
    cy.get("[id='add-item-vendor']").type("Ulta")
    cy.get("[id='add-item-cost']").type("9.99")
    cy.get("[id='add-item-date']").type("2023-10-09")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")

    // --- haircare item
    cy.get("[id='add-item-cat']").select("Haircare")
    cy.get("[id='add-item-type']").type("Leave-In Treatment")
    cy.get("[id='add-item-desc']").type("K18, Full Size")
    cy.get("[id='add-item-vendor']").type("K18")
    cy.get("[id='add-item-cost']").type("79.99")
    cy.get("[id='add-item-date']").type("2023-09-15")
    cy.get("[id='submit-new-item']").click()
    cy.get("[id='success-message']").contains("New item added to your personal inventory!")
  })
})

// ______________________________________________________

describe('Category Selector Test: Tops & Log Item Use Test', () => {
  it('click cateogry dropdown selector, choose tops, click view category button, validate js inserted text, validate test item top row id matches item id, click log use button', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')
    
    cy.get('select')
      .eq(1)
      .select('Tops')
    
    cy.get('button')
      .get('[id="view-category"]')
      .click()
   
    cy.get('[id="displayed-category"]').contains('Tops')
   
    cy.window()
      .then((win) => {
        cy.stub(win, 'prompt').returns('2023-09-13');
    })

    cy.get('table')
      .get('tbody')
      .get('[id="test_item_01"]')
      .get('button')
      .contains('Log Item Use')
      .click()
  })
})

// ______________________________________________________

describe('Category Selector Test: Bottoms', () => {
  it('click cateogry dropdown selector, choose bottoms, click view category button, validate js inserted text', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')
    
    cy.get('select')
      .eq(1)
      .select('Bottoms')
    
    cy.get('button')
      .get('[id="view-category"]')
      .click()
   
    cy.get('[id="displayed-category"]').contains('Bottoms')
  })
})

describe('Category Selector Test: Dresses/Rompers', () => {
  it('click cateogry dropdown selector, choose dresses/rompers, click view category button, validate js inserted text', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')
    
    cy.get('select')
      .eq(1)
      .select('Dresses/Rompers')
    
    cy.get('button')
      .get('[id="view-category"]')
      .click()
    
    cy.get('[id="displayed-category"]').contains('Dresses/Rompers')
  })
})

describe('Category Selector Test: Outerwear', () => {
  it('click cateogry dropdown selector, choose outerwear, click view category button, validate js inserted text', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')
    
    cy.get('select')
      .eq(1)
      .select('Outerwear')
    
    cy.get('button')
      .get('[id="view-category"]')
      .click()
    
    cy.get('[id="displayed-category"]').contains('Outerwear')
  })
})

describe('Category Selector Test: Shoes', () => {
  it('click cateogry dropdown selector, choose shoes, click view category button, validate js inserted text', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')
    
    cy.get('select')
      .eq(1)
      .select('Shoes')
    
    cy.get('button')
      .get('[id="view-category"]')
      .click()
    
    cy.get('[id="displayed-category"]').contains('Shoes')
  })
})

describe('Category Selector Test: Bras', () => {
  it('click cateogry dropdown selector, choose bras, click view category button, validate js inserted text', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')
    
    cy.get('select')
      .eq(1)
      .select('Bras')
    
    cy.get('button')
      .get('[id="view-category"]')
      .click()
    
    cy.get('[id="displayed-category"]').contains('Bras')
  })
})

describe('Category Selector Test: Underwear', () => {
  it('click cateogry dropdown selector, choose underwear, click view category button, validate js inserted text', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')
    
    cy.get('select')
      .eq(1)
      .select('Underwear')
    
    cy.get('button')
      .get('[id="view-category"]')
      .click()
    
    cy.get('[id="displayed-category"]').contains('Underwear')
  })
})

describe('Category Selector Test: Bathing Suits', () => {
  it('click cateogry dropdown selector, choose bathing suits, click view category button, validate js inserted text', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')
    
    cy.get('select')
      .eq(1)
      .select('Bathing Suits')
    
    cy.get('button')
      .get('[id="view-category"]')
      .click()
    
    cy.get('[id="displayed-category"]').contains('Bathing Suits')
  })
})

describe('Category Selector Test: Leisurewear', () => {
  it('click cateogry dropdown selector, choose leisurewear, click view category button, validate js inserted text', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')
    
    cy.get('select')
      .eq(1)
      .select('Leisurewear')
    
    cy.get('button')
      .get('[id="view-category"]')
      .click()
    
    cy.get('[id="displayed-category"]').contains('Leisurewear')
  })
})

describe('Category Selector Test: Skincare', () => {
  it('click cateogry dropdown selector, choose skincare, click view category button, validate js inserted text', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')
    
    cy.get('select')
      .eq(1)
      .select('Skincare')
    
    cy.get('button')
      .get('[id="view-category"]')
      .click()
    
    cy.get('[id="displayed-category"]').contains('Skincare')
  })
})

describe('Category Selector Test: Make-Up', () => {
  it('click cateogry dropdown selector, choose make-up, click view category button, validate js inserted text', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')
    
    cy.get('select')
      .eq(1)
      .select('Makeup')
    
    cy.get('button')
      .get('[id="view-category"]')
      .click()
    
    cy.get('[id="displayed-category"]').contains('Makeup')
  })
})

describe('Category Selector Test: Haircare', () => {
  it('click cateogry dropdown selector, choose haircare, click view category button, validate js inserted text', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')

    cy.get('select')
      .eq(1)
      .select('Haircare')

    cy.get('button')
      .get('[id="view-category"]')
      .click()
    
    cy.get('[id="displayed-category"]').contains('Haircare')
  })
})

// ______________________________________________________

describe('View Records Test', () => {
  it('click cateogry dropdown selector, choose tops, click view category button, validate js inserted text, validate test item top row id matches item id, click log use button', () => {
    cy.visit('http://127.0.0.1:5500//House_Manager_07-19-23/index.html')

    cy.get('select')
      .eq(1)
      .select('Tops')

    cy.get('button')
      .get('[id="view-category"]')
      .click()

    cy.get('[id="displayed-category"]').contains('Tops')

    cy.get('table')
      .get('tbody')
      .get('[id="test_item_01"]')
      .get('button')
      .contains('View Records')
      .click()

    cy.get("[id='logged-dates']").contains('2023-09-13')
  })
})
// =============================================
// Task 2: Basic CRUD Operations
// ==============================================
//a) Find all books in a specific genre
db.books.find({ genre: "Adventure"});

// b) Find books published after a certain year
db.books.find({ published_year: { $gt: 1850 } });

// c) Find books by specific author
db.books.find({ author: "Herman Melville"});

//d) Update the prce of a specific book
db.books.updateOne(
    { title: "Moby Dick"},
    {$set: { price: 50.30 }}
);

// c) Delete book by its title
db.books.deleteOne({ title: "Paulo Coelho"});


// ===================================================
// Task 3: Advanced Queries
// ===================================================
// Write a query to find books that are both in stock and published after 2010
db.books.find(
    { in_stock: true,
     published_year: { $gt: 2010 }}
);

// Use projection to return only the title, author, and price fields in your queries
db.books.find(
    {   in_stock: true,
        published_year: { $gt: 2010 }
    },
    {
        title: 1,
        author: 1,
        price: 1
    }
);


// Implement sorting to display books by price (both ascending and descending)
//Ascending
db.books.find(
    {   in_stock: true,
        published_year: { $gt: 2010 }
    },
    {
        title: 1,
        author: 1,
        price: 1
    }
).sort({ price: 1});

//Descending
db.books.find(
    {   in_stock: true,
        published_year: { $gt: 2010 }
    },
    {
        title: 1,
        author: 1,
        price: 1
    }
).sort({ price: -1});



// Use the limit and skip methods to implement pagination (5 books per page)
db.books.find(
    {   in_stock: true,
        published_year: { $gt: 2010 }
    },
    {
        title: 1,
        author: 1,
        price: 1
    }
).sort({ price: 1}).limit(5).skip(0);

//=====================================================
// Task 4: Aggregation Pipeline
//=====================================================
// Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
    {
        $group: {
            _id: "$genre",
            avgPrice: { $avg: "$price"}
        }
    }
]);



// Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
    {
        $group: {
            _id: "$author",
            bookCount: { $sum: 1}
        }
    },
    {
        $sort: { bookCount: -1 }
    }
]);



// Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
    {
        $group: {
            _id: { 
                $multiply: [ { 
                    $floor: { 
                        $divide: [ "$published_year", 10]
                    }
                }, 10 ]
            },
            totalBooks: { $sum: 1}
        }
    }
]).sort({ totalBooks: -1});
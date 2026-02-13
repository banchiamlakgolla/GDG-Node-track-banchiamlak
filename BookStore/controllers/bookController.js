let books = [
  { id: 1, title: "Mathematics", price: 30 },
  { id: 2, title: "Biology", price: 25 }
];

export const getAllBooks = (req, res) => {
  res.status(200).json(books);
};

export const getBookById = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.status(200).json(book);
};

export const createBook = (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    price: req.body.price
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

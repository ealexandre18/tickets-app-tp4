const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const SECRET = process.env.JWT_SECRET || "secret-de-dev-a-changer";

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req, res) => {
  const { email, motDePasse } = req.body || {};
  const user = router.db.get("users").find({ email }).value();

  if (!user || !motDePasse || !bcrypt.compareSync(motDePasse, user.motDePasseHash)) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, nom: user.nom },
    SECRET,
    { expiresIn: "1h" }
  );

  return res.json({
    token,
    utilisateur: {
      id: user.id,
      nom: user.nom,
      email: user.email,
      role: user.role,
    },
  });
});

server.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  const token = auth.split(" ")[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Non authentifié" });
  }
});

server.use("/users", (req, res) => {
  return res.status(403).json({ message: "Accès interdit à la collection users" });
});

server.delete("/tickets/:id", (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Suppression réservée aux administrateurs" });
  }
  next();
});

server.use(router);
server.listen(3001, () => {
  console.log("API sécurisée sur http://localhost:3001");
});

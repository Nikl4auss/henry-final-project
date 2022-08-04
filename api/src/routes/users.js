const router = require("express").Router();
const { User, Cart, Address } = require("../db");
const management = require("../controllers/auth0ManagmentClient");
const checkJwt = require("../middleware/checkJwt");
const checkPermissions = require("../middleware/checkPermissions");
const { DB_USER } = require("../utils/config");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Address,
        },
      ],
    });
    res.status(200).send(users);
  } catch (e) {
    res.status(500).json({
      msg: "Users couldn't be retrieved",
      error: e,
    });
  }
});

router.post("/", async (req, res) => {
  const { name, surname, email, user_id } = req.body;

  if (!name || !email || !user_id) {
    return res.status(400).json({
      msg: "There are missing properties, couldn't create the user",
    });
  }
  try {
    const newUser = await User.create({
      name,
      surname,
      email,
      auth0_id: user_id,
    });
    const newCart = await Cart.create({
      id: user_id,
    });

    newCart.setUser(newUser);

    return res.status(200).json(newUser);
  } catch (e) {
    res.status(500).json({
      msg: "There was an error during User creation, aborted",
      error: e,
    });
  }
});

router.patch(
  "/:userId/blockUser",
  checkJwt,
  checkPermissions,
  async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    const { blocked } = req.body;
    try {
      const updatedUser = await management.updateUser(
        { id: userId },
        {
          blocked: blocked,
        }
      );

      if (updatedUser) {
        const dbUser = await User.findByPk(updatedUser.user_id);
        await dbUser.update({ blocked: updatedUser.blocked });
        return res.status(200).json(dbUser);
      }
      return res.status(400).json({
        msg: "No se encontro al usuario en la base de datos",
      });
    } catch (error) {
      return res.status(500).json({
        msg: "No se pudo bloquear al usuario, abortando.",
        error,
      });
    }
  }
);
module.exports = router;

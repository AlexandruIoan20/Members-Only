const express = require("express");
const router = express.Router(); 

const genre_controller = require("../controllers/genre_controller");
const home_controller = require("../controllers/home_controller");
const post_controller = require("../controllers/post _controller");
const profile_controller = require("../controllers/profile_controller");
const auth_controller = require("../controllers/auth_controller");

router.get("/", home_controller.index); 

// Auth Routes
router.get("/login", auth_controller.login_get);
router.post("/login", auth_controller.login_post);

router.get("/register", auth_controller.register_get);
router.post("/register", auth_controller.register_post);

// Genre Routes 
router.get("/genres/create", genre_controller.create_genre_get); 
router.post("/genres/create", genre_controller.create_genre_post);

router.get("/genres/:id/delete", genre_controller.delete_genre_get);
router.post("/genres/:id/delete", genre_controller.delete_genre_post);

router.get("/genres/:id/update", genre_controller.update_genre_get);
router.post("/genres/:id/update", genre_controller.update_genre_post);

router.get("/genres", genre_controller.genre_list);
router.get("/genres/:id", genre_controller.genre_detail);

// Profile Controller
router.get("/profiles/:id/delete", profile_controller.delete_profile_get);
router.post("/profiles/:id/delete", profile_controller.delete_profile_post);

router.get("/profiles/:id/update", profile_controller.update_profile_get);
router.post("/profiles/:id/update", profile_controller.update_profile_post);

router.get("/profiles/:id", profile_controller.profile_detail);

// Post Controller 
router.get("/profiles/:id/create", post_controller.create_post_get);
router.post("/profiles/:id/create", post_controller.create_post_post);

router.get("/profiles/:id/:postId/delete", post_controller.delete_post_get);
router.post("/profiles/:id/:postId/delete", post_controller.delete_post_post);

router.get("/profiles/:id/:postId/update",  post_controller.update_post_get);
router.post("/profiles/:id/:postId/update", post_controller.update_post_post);

router.get("/profiles/:id/:postId", post_controller.post_detail);

module.exports = router; 

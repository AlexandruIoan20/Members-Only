const express = require("express");
const router = express.Router(); 

const genre_controller = require("../controllers/genre_controller");
const home_controller = require("../controllers/home_controller");
const post_controller = require("../controllers/post _controller");
const profile_controller = require("../controllers/profile_controller");
const auth_controller = require("../controllers/auth_controller");
const checkAuthenticated = require("../middleware/checkAuth");
const checkNotAuthenticated = require("../middleware/checkNotAuth");

router.get("/", checkAuthenticated, home_controller.index); 

// Auth Routes
router.get("/login", checkNotAuthenticated, auth_controller.login_get);
router.get("/register", checkNotAuthenticated,  auth_controller.register_get);
router.post("/register", checkNotAuthenticated,  auth_controller.register_post);
router.post("/login", checkNotAuthenticated,  auth_controller.login_post);

// Genre Routes 
router.get("/genres/create", checkAuthenticated,  genre_controller.create_genre_get); 
router.post("/genres/create", checkAuthenticated, genre_controller.create_genre_post);

router.get("/genres/:id/delete", checkAuthenticated,  genre_controller.delete_genre_get);
router.post("/genres/:id/delete", checkAuthenticated, genre_controller.delete_genre_post);

router.get("/genres/:id/update", checkAuthenticated,  genre_controller.update_genre_get);
router.post("/genres/:id/update", checkAuthenticated,  genre_controller.update_genre_post);

router.get("/genres", checkAuthenticated, genre_controller.genre_list);
router.get("/genres/:id", checkAuthenticated, genre_controller.genre_detail);

// Profile Controller
router.get("/profiles/:id/delete", checkAuthenticated,  profile_controller.delete_profile_get);
router.post("/profiles/:id/delete", checkAuthenticated,  profile_controller.delete_profile_post);

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

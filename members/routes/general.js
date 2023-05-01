const express = require("express");
const router = express.Router(); 

const genre_controller = require("../controllers/genre_controller");
const home_controller = require("../controllers/home_controller");
const post_controller = require("../controllers/post _controller");
const profile_controller = require("../controllers/profile_controller");
const auth_controller = require("../controllers/auth_controller");
const checkAuthenticated = require("../middleware/checkAuth");
const checkNotAuthenticated = require("../middleware/checkNotAuth");
const admin_controller = require("../controllers/admin_controller");
const request_controller = require("../controllers/request_controller");

const { isMember, isAdmin, isOwner } = require("../middleware/grade_security");

router.get("/", checkAuthenticated, home_controller.index); 
router.get("/users", checkAuthenticated, isAdmin, home_controller.users_list);
router.get("/info", checkAuthenticated, home_controller.info_page); 

// Auth Routes
router.get("/login", checkNotAuthenticated, auth_controller.login_get);
router.get("/register", checkNotAuthenticated,  auth_controller.register_get);
router.post("/register", checkNotAuthenticated,  auth_controller.register_post);
router.post("/login", checkNotAuthenticated,  auth_controller.login_post);
router.post("/logout", auth_controller.logout);

// Genre Routes 
router.get("/genres/create", checkAuthenticated, isAdmin, genre_controller.create_genre_get); 
router.post("/genres/create", checkAuthenticated, isAdmin, genre_controller.create_genre_post);

router.get("/genres/:id/delete", checkAuthenticated, isAdmin, genre_controller.delete_genre_get);
router.post("/genres/:id/delete", checkAuthenticated, isAdmin, genre_controller.delete_genre_post);

router.get("/genres/:id/update", checkAuthenticated, isAdmin, genre_controller.update_genre_get);
router.post("/genres/:id/update", checkAuthenticated, isAdmin, genre_controller.update_genre_post);

router.get("/genres", checkAuthenticated, genre_controller.genre_list);
router.get("/genres/:id", checkAuthenticated, genre_controller.genre_detail);

// Profile Controller
router.get("/profiles/:id/r", request_controller.request_user_list);
router.get("/profiles/:id/delete", checkAuthenticated,  profile_controller.delete_profile_get);
router.post("/profiles/:id/delete", checkAuthenticated,  profile_controller.delete_profile_post);

router.get("/profiles/:id/update", profile_controller.update_profile_get);
router.post("/profiles/:id/update", profile_controller.update_profile_post);

router.get("/profiles/:id/promote", isOwner, admin_controller.promote_get); 
router.post("/profiles/:id/promote", isOwner, admin_controller.promote_post);

router.get("/profiles/:id", profile_controller.profile_detail);

// Post Controller 
router.get("/profiles/:id/create", post_controller.create_post_get);
router.post("/profiles/:id/create", post_controller.create_post_post);

router.get("/profiles/:id/:postId/delete", post_controller.delete_post_get);
router.post("/profiles/:id/:postId/delete", post_controller.delete_post_post);

router.get("/profiles/:id/:postId/update",  post_controller.update_post_get);
router.post("/profiles/:id/:postId/update", post_controller.update_post_post);

router.get("/profiles/:id/:postId", post_controller.post_detail);

// Request Controller 
router.get("/requests/create", request_controller.request_create_get); 
router.post("/requests/create", request_controller.request_create_post); 

router.get("/requests/:id/delete", request_controller.request_delete_get); 
router.post("/requests/:id/delete", request_controller.request_delete_post); 

router.get("/requests/:id/update", request_controller.request_update_get); 
router.post("/requests/:id/update", request_controller.request_update_post); 

router.get("/requests/:id/modify", isAdmin || isOwner, request_controller.request_modify_status_get); 
router.post("/requests/:id/modify", isAdmin || isOwner, request_controller.request_modify_status_post);

router.get("/requests", request_controller.request_list); 
router.get("/requests/:id", request_controller.request_detail);

module.exports = router; 

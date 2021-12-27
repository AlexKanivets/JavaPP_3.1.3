package web.crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import web.crud.model.User;
import web.crud.service.RoleService;
import web.crud.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final UserService userService;

    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> allUsers() {
        return userService.getAllUser();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable("id") long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/users")
    public User newUser(@RequestBody User user) {
        User user1 = user;
        return userService.createUser(user1);
    }

    @PatchMapping("/users/{id}")
    public User updateUser(@RequestBody User user, @PathVariable("id") long id) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/admin/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
    }
}

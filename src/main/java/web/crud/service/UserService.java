package web.crud.service;

import web.crud.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUser();
    User getUserById(long id);
    User createUser(User user);
    User updateUser(long id, User updatedUser);
    void deleteUser(long id);
    User getUserByEmail(String email);
}

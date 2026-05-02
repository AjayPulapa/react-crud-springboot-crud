package com.example.demo.service;

import com.example.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    User save(User user);
    User update(Long id, User user);
    void delete(Long id);
    User getById(Long id);
    Page<User> getAll(Pageable pageable);
}

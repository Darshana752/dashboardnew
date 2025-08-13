package com.example.backend;

import org.springframework.web.bind.annotation.*;
import com.example.backend.*;

@CrossOrigin(origins = "http://localhost:300") // Allow React frontend
@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserRepository repo;

  public UserController(UserRepository repo) {
    this.repo = repo;
  }

  @PostMapping
  public Users createUser(@RequestBody Users user) {
    return repo.save(user);
  }
}

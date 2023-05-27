package com.metropolitan.wheelerDealers.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignupRequest {
  private String username;
  private String email;
//  private Set<String> role;
  private String password;
  private String firstName;
  private String lastName;
}

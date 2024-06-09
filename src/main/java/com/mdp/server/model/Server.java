package com.mdp.server.model;

import com.mdp.server.enumration.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Server {
    @Id @GeneratedValue(strategy = AUTO)
    private Long id;
    @Column(unique = true)
    @NotEmpty(message = "Ip Address can't be empty or null")
    private String ipAddress;

    private String name;
    private String memory;
    private String type;
    private String imageUrl;
    private Status status;

}

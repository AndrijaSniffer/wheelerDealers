package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "`order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_order", nullable = false)
    private Integer id;

    @Column(name = "id_user", nullable = false)
    private Integer idUser;

    @Column(name = "order_number", nullable = false)
    private String orderNumber;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "total", nullable = false)
    private Integer total;

}
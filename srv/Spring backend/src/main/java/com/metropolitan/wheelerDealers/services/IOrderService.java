package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.Order;

import java.util.List;

public interface IOrderService {
    List<Order> getAllOrders();
    boolean createOrUpdateOrder(Order order);
    Order getOrderById(Integer id);
    void deleteOrder(Integer id);
}

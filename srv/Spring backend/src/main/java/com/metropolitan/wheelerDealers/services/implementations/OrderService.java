package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.Order;
import com.metropolitan.wheelerDealers.repositories.IOrderRepo;
import com.metropolitan.wheelerDealers.services.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private IOrderRepo orderRepo;

    @Override
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    public boolean createOrUpdateOrder(Order order) {
        return orderRepo.save(order).getId() != null;
    }

    @Override
    public Order getOrderById(Integer id) {
        return orderRepo.findById(id).orElse(new Order());
    }

    @Override
    public void deleteOrder(Integer id) {
        orderRepo.deleteById(id);
    }
}

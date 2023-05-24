package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.Order;
import com.metropolitan.wheelerDealers.services.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("orders")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrders(){
        List<Order> countries = orderService.getAllOrders();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable int id){
        Order c = orderService.getOrderById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody Order order){
        if(orderService.createOrUpdateOrder(order)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> updateOrder(@RequestBody Order order){
        if(order.getId() != null) {
            if (orderService.createOrUpdateOrder(order)) {
                return ResponseEntity.ok("Updated");
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else{
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Integer id){
        orderService.deleteOrder(id);
        return ResponseEntity.ok("Deleted");
    }
}

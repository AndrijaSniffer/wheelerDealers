package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.DTO.MessageResponse;
import com.metropolitan.wheelerDealers.entities.Order;
import com.metropolitan.wheelerDealers.services.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("orders")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<List<Order>> getAllOrders(){
        List<Order> countries = orderService.getAllOrders();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<Order> getOrderById(@PathVariable int id){
        Order c = orderService.getOrderById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> createOrder(@RequestBody Order order){
        if(orderService.createOrUpdateOrder(order)){
            return ResponseEntity.ok(new MessageResponse("Created"));
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> updateOrder(@RequestBody Order order){
        if(order.getId() != null) {
            if (orderService.createOrUpdateOrder(order)) {
                return ResponseEntity.ok(new MessageResponse("Updated"));
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else{
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> deleteOrder(@PathVariable Integer id){
        orderService.deleteOrder(id);
        return ResponseEntity.ok(new MessageResponse("Deleted"));
    }
}

package com.example.backend.controllers;

import com.example.backend.dtos.CommentDTO;
import com.example.backend.services.comment.ICommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {
    private final ICommentService commentService;

    @PostMapping("")
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentDTO commentDTO) {
        return ResponseEntity.ok(
                commentService.createComment(commentDTO)
        );
    }

    @GetMapping()
    public ResponseEntity<List> loadComment(@RequestParam("grade_id") String gradeId) {
        return ResponseEntity.ok(
                commentService.loadComment(gradeId)
        );
    }

}

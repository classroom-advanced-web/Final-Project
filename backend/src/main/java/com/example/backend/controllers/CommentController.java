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

    @GetMapping("/classroom/{classroom_id}")
    public ResponseEntity<List> loadComment(@RequestParam(name = "grade_id", required = false) String gradeId, @PathVariable("classroom_id") String classroomId) {
        return ResponseEntity.ok(
                commentService.loadComment(gradeId, classroomId)
        );
    }

    @GetMapping("/reply/{comment_id}")
    public ResponseEntity<List> loadReplyComment(@PathVariable("comment_id") String commentId) {
        return ResponseEntity.ok(
                commentService.loadReplyComment(commentId)
        );
    }

    @PutMapping("/status/{comment_id}")
    public ResponseEntity<CommentDTO> changeShutDownStatus(@PathVariable("comment_id") String commentId, @RequestParam("status") Boolean status, @RequestParam("classroom_id") String classroomId) {
        return ResponseEntity.ok(
                commentService.changeShutDownStatus(commentId, status, classroomId)
        );
    }

}

package com.example.backend.services.comment;

import com.example.backend.dtos.CommentDTO;

public interface ICommentService {

    CommentDTO createComment(CommentDTO commentDTO);

}

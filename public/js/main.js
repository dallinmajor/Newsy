

$(document).ready(function () {

    const api = {

        getArticleComments(article_id, cb) {

            console.log(article_id);

            $.get("/api/article/comments/" + article_id, function (comments) {
                comments.forEach(function(comment) {
                    cb(article_id, comment);
                })
            })
        },

        addComment(article_id, comment_obj, cb) {

            $.post("/articles/api/comment/" + article_id, comment_obj, function (comment) {

                cb(article_id, comment);
            })
        },

        deleteComment(comment_id) {

            $.ajax({
                url: "/articles/api/delete/" + comment_id,

                method: "DELETE",
            })

            $(`#${comment_id}`).remove();
        }
    };

    const display = {
        poplulateComment(article_id, db_comment) {
            const { comment, _id } = db_comment;

            const comment_elm = `
        <div id=${_id} class="comment">
            <div class="card w-100">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-10">
                            <p class="card-text">${comment}</p>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-1">
                            <p id="delete" data-comment-id=${_id}>x</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
            $(`#comments_box_${article_id}`)
                .append(comment_elm);
        }
    };


    $('body').on('click', '#addBtn', function () {
        const article_id = $(this).attr('data-article-button');
        const theComment = $(`#addAComment_${article_id}`).val();

        api.addComment(article_id, { comment: theComment, article: article_id }, display.poplulateComment);
    });

    $('body').on('click', '#delete', function () {
        const id = $(this).attr('data-comment-id');

        api.deleteComment(id);
    });

    $('body').on('click', '#ViewComments', function () {
        
        const id = $(this).attr("data-article-id");
        console.log(id);

        api.getArticleComments(id,display.poplulateComment);
        
        $(this).remove();
    })


});


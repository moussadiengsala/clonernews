"use client"

import React from "react"
import Comments from "@/app/Components/Comments"
import Post from "@/app/Components/Post/Post"
import {useState, useEffect} from "react"

type Comment = {
    comment?: JSX.Element,
    reply?: JSX.Element[]
}

export default function SinglePost({ params }: { params: { id: string } }) {
  const [postData, setPostData] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);


  useEffect(() => {
      const fetchData = async () => {
          const postRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json`);
          const postData = await postRes.json();
          setPostData(postData);

          if (postData.kids) {
              const commentsPromises: Comment[] = postData.kids.map(async (id: number) => {
                let comment: Comment = {}
                  const commentRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                  const commentData = await commentRes.json();
                  comment.comment = <Comments key={id} {...commentData} />;

                  if (commentData.kids) {
                      comment.reply = commentData.kids.map( async (id: number) => {
                          const replayRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                          const replayData = await replayRes.json();

                          return <Comments key={id} {...replayData} />
                      })
                  }
                  return comment
              });

              const comments = await Promise.all(commentsPromises);
              setComments(comments);
          }
      };

      fetchData();
  }, [params.id]);

  return (
      <main className="py-24 px-14">
          <div className="space-y-4 bg-white py-8">
              {postData && <Post {...postData} />}
              <div className="space-y-4 mx-8">
                {comments.map((current, index) => {
                  return (
                    <React.Fragment key={index}>
                      {current.comment}
                      <div className="space-y-4 mx-8">
                        {current.reply}
                      </div>
                    </React.Fragment>
                  )
                })}
              </div>
          </div>
      </main>
  );
}

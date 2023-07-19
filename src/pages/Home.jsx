import React, { useState } from 'react';
import { Heading, Box, Text, Button, Input, Select } from "@chakra-ui/react";
import uniqid from 'uniqid';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const Home = () => {
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState("");
    const [most, setMost] = useState("");
    const [list, setList] = useState("");
    const [data, setData] = useState([
        {
            id: uniqid(),
            comment: "This is nice UI!",
            reply: [
                "It's really good", "great!", "nice one"
            ],
            upVotes: 2,
            downVotes: 1
        },
        {
            id: uniqid(),
            comment: "This is nice website !",
            reply: [
                "It's really good", "great!", "nice one"
            ],
            upVotes: 2,
            downVotes: 1
        },
        {
            id: uniqid(),
            comment: "This is nice website you have built !",
            reply: [
                "It's really good", "great!", "nice one", "great work"
            ],
            upVotes: 4,
            downVotes: 0
        }
    ]);

    const handleComment = () => {
        const newComment = {
            id: uniqid(),
            comment: comment,
            reply: [],
            upVotes: 0,
            downVotes: 0
        }

        setData([...data, newComment]);

        setComment("");
    }

    const handleLike = (id) => {
        const like = data.filter((el, index) => {
            return el.id == id;
        });

        let obj = like[0];
        for (let i in obj) {
            if (i == "upVotes") {
                obj[i]++;
            }
        }

        const upVoteAddedData = data.filter((el, index) => {
            return el.id !== id;
        });

        setData([...upVoteAddedData, obj]);

    }

    const handleDisLike = (id) => {
        const disLike = data.filter((el, index) => {
            return el.id == id;
        });

        let obj = disLike[0];
        for (let i in obj) {
            if (i == "downVotes") {
                obj[i]++;
            }
        }

        const downVoteAddedData = data.filter((el, index) => {
            return el.id !== id;
        });

        setData([...downVoteAddedData, obj]);

    }


    const handleReply = (id) => {

        const ReplyForUpdate = data.filter((el, index) => {
            return el.id == id;
        });

        const obj = ReplyForUpdate[0];

        for (let i in obj) {
            if (i == "reply") {
                console.log(obj[i])
            }
        }
        console.log(obj)

        const IndividualReply = data.filter((el, index) => {
            return el.id !== id;
        });

        setData([...IndividualReply, obj]);
    }

    const handleSort = (e) => {
        sortBy = e.target.value;
        if(sortBy=="list"){
            data.sort()
        }else{
            
        }
    }



    return (
        <div >
            <Box width="50%" margin="auto">
                <Select onChange={(e)=>handleSort(e)}>
                    <option>Choose sort by</option>
                    <option value="most" >Most Score</option>
                    <option value="list" >List Score</option>
                </Select>
            </Box>
            <Box w="50%" margin="auto" border="1px solid gray">
                <Box w="100%">
                    <Input value={comment} type="text" placeholder="Add new comment" onChange={(e) => setComment(e.target.value)} border="1px solid teal"></Input>
                    <Button flex='1' variant='ghost' onClick={() => handleComment(comment.id)}>
                        Comment
                    </Button>
                </Box>

                {data.length > 0 && data.map((comments, index) => (
                    <Box key={comments.id} border="1px solid black" padding="5px" textAlign="left">
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Text fontWeight="bold">{comments.comment}</Text>
                            <Button onClick={() => handleLike(comments.id)}><AiOutlineLike /> {comments.upVotes}</Button>
                            <Button onClick={() => handleDisLike(comments.id)}><AiOutlineDislike /> {comments.downVotes}</Button>
                        </Box>
                        {comments.reply.length > 0 && comments.reply.map((rep, index) => (
                            <Box width="70%" key={index} border="1px solid gray" padding="5px" textAlign="left" borderRadius="5px" marginTop="5px">
                                <Text>{rep}</Text>
                            </Box>
                        ))}
                        <Box w="100%">
                            <Input value={reply} type="text" placeholder="Add new reply..." onChange={(e) => setReply(e.target.value)} border="1px solid teal"></Input>
                            <Button flex='1' variant='outline' colorScheme="cyan" onClick={() => handleReply(comments.id)}>
                                Add Reply
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>
            {console.log(data)}
        </div>
    )
}

export default Home
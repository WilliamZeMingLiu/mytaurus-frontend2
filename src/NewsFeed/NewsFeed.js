import React from 'react';
import "./NewsFeed.css"
import {CardContent} from "semantic-ui-react";
import {Card} from "@material-ui/core";

const NewsFeed = ({ url, title, date, content, bottomMargin }) => {
    return (
        <Card className="container" style={{ marginBottom: bottomMargin }}>
            <CardContent className="cardcontainer">
                <div id="imgcont">
                    <img src={url} alt="newsimg"/>
                </div>
                <div id="content">
                    <div>
                        <h4>{title}</h4>
                        <p>{date}</p>
                    </div>
                    <p>{content}</p>
                </div>

            </CardContent>
        </Card>
    );
};

NewsFeed.defaultProps = {
    bottomMargin: 16
}

export default NewsFeed;
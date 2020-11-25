import React from "react";
import Card from "../Card/Card";
import F from "./Feed.module.css";
import { cardColors } from "../../commons/colors";

function Feed() {
    const cardProps = Array.from({ length: 40 }, () => ({
        color: cardColors[Math.floor(Math.random() * cardColors.length)],
        name: 'Cat',
        text: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
        sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
        vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
        info: new Date().toString('d'),

    }));
    return (
        <div className={F.feed}>
            {cardProps.map((card, i) => (
                <Card key={`card${i}`} {...card} />
            ))}
        </div>
    );
}

export default Feed;

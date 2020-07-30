import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import ShowMore from "./ShowMore";
import DateField from "./DateField";

const CardContainer = styled.div`
  margin-bottom: 8px;
`;

const CardText = styled.h3`
  font: 12pt sans-serif;
  text-align: left;
`

const TrelloCard = ({ text, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <CardContent>
              <CardText gutterBottom>{text}</CardText>
            </CardContent>
            <ShowMore/>
            <DateField/>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );
};

export default TrelloCard;

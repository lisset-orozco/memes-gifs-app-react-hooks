import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NoResults from "./NoResults";
import Loading from "./Loading";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#1d1d1d",
    marginTop: "56px",
    paddingTop: "50px",
    minHeight: "100vh",
    overflow: "hidden"
  },
  gridList: {
    width: "auto",
    height: "auto"
  }
}));

const Results = ({ results, load, onClickCategory }) => {
  const classes = useStyles();

  return load ? (
    <Loading />
  ) : results.length === 0 ? (
    <NoResults onClickCategory={onClickCategory} />
  ) : (
    <Grid
      container
      direction="row"
      justify="flex-start"
      spacing={1}
      className={classes.root}
    >
      {results.map((meme, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          align="center"
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            padding: "0"
          }}
        >
          <figure key={index}>
            <img
              alt="result"
              src={meme.link}
              style={{ maxHeight: "256px", maxWidth: "300px" }}
            />
          </figure>
        </Grid>
      ))}
    </Grid>
  );
};

export default Results;

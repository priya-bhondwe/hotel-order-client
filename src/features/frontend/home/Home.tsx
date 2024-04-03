import { Button, Container, Paper, Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ImageForm = () => {
  return (
    <>
      <Grid
        container
        md={12}
        className="polaroid-img"
        style={{ marginLeft: "10px" }}
      >
        <Grid item md={6} xs={12}>
          <Grid
            className="polaroid rotate_right"
            style={{
              width: "284px",
              padding: "8px",
              border: "1px solid #BFBFBF",
              backgroundColor: "white",
              boxShadow: "10px 10px 5px #aaaaaa",
              float: "left",
              transform: "rotate(7deg)",
              // marginRight: "20px", // Add margin between the polaroids
            }}
          >
            <img
              src="../images/biryani.png"
              alt="Biryani"
              width="284"
              height="200"
            />
            <p className="caption">Biryani - A delicious rice dish.</p>
          </Grid>

          <Grid
            className="polaroid rotate_left"
            style={{
              width: "284px",
              padding: "8px",
              border: "1px solid #BFBFBF",
              backgroundColor: "white",
              boxShadow: "10px 10px 5px #aaaaaa",
              float: "left",
              transform: "rotate(-8deg)",
            }}
          >
            <img
              src="../images/vegetable.png"
              alt="Vegetable Dish"
              width="284"
              height="200"
            />
            <p className="caption">Vegetable Dish - Fresh and healthy.</p>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12} style={{ width: "50%" }}>
          <Grid
            className="polaroid rotate_right"
            style={{
              width: "284px",
              padding: "8px",
              border: "1px solid #BFBFBF",
              backgroundColor: "white",
              boxShadow: "10px 10px 5px #aaaaaa",
              float: "left",
              transform: "rotate(7deg)",
              marginRight: "20px", // Add margin between the polaroids
            }}
          >
            <img
              src="../images/south-indian.png"
              alt="Biryani"
              width="284"
              height="200"
            />
            <p className="caption">
              South Indian Food - Delicious and aromatic.
            </p>
          </Grid>

          <Grid
            className="polaroid rotate_left"
            style={{
              padding: "8px",
              border: "1px solid #BFBFBF",
              backgroundColor: "white",
              boxShadow: "10px 10px 5px #aaaaaa",
              float: "left",
              transform: "rotate(-8deg)",
            }}
          >
            <img
              src="../images/vadapav.jpg"
              alt="Vegetable Dish"
              width="284"
              height="200"
            />
            <p className="caption">
              Vadapav - Spicy and flavorful street food.
            </p>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const Home = () => {
  return (
    <Grid container md={12} style={{ position: "relative" }}>
      <Grid
        container
        justifyContent="space-between"
        style={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} sm={6} md={6}>
          <Grid
            className="plate-img"
            style={{
              position: "relative",
            }}
          >
            <img
              src="../\images\Sweet-and-Sour.png"
              alt=""
              style={{
                position: "absolute",
                top: "-55px",
                left: "-200px",
                transform: "rotate(330deg)",
                height: "330px",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20%",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  justifyContent: "end",
                  fontFamily: "cursive",
                  paddingTop: { xs: "50px" },
                  margin: 0,
                  fontSize: { xs: "24px", sm: "30px", md: "30px" },
                }}
              >
                <b>Best Food For Your Taste</b>
              </Typography>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "cursive",
                  margin: "10px 0",
                }}
              >
                Discover delectable cuisine and unforgettable moments in our
                welcoming culinary haven
              </p>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  type="button"
                  variant="text"
                  style={{ margin: "0 10px" }}
                >
                  <Link to="/order-checkout">See A Order</Link>
                </Button>
                <Button
                  type="button"
                  variant="text"
                  style={{ margin: "0 10px" }}
                >
                  <Link to="/menus"> Explore Menu</Link>
                </Button>
              </Box>
              <Grid style={{ textAlign: "center", marginTop: "20px" }}>
                <img src="../\images\all food.png" width="100%" alt="" />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ImageForm />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Home;

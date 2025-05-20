"use client";

import React from "react";
import NavBar from "../../components/NavBar";
import { Box, List, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import serviceDogImage from "../../../public/servicedog.png";
import Footer from "./components/footer";

export default function Info() {
  return (
    <>
      <title>Info - Service Dogs Around Town</title>
      <NavBar />
      <main>
        <Box
          sx={{
            maxWidth: "700px",
            mx: "auto",
            px: 2,
          }}
        >
          <Image
            src={serviceDogImage}
            alt="yellow labrador retriever service dog wearing a green guide dogs for the blind vest looks up and to the right while laying down"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              border: "1px solid gray",
              borderRadius: "2px",
              marginTop: 24,
              boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
            placeholder="blur"
          />
          <section>
            <Typography variant="h2" fontSize="h5.fontSize" sx={{ my: 2 }}>
              About
            </Typography>
            <Typography variant="body1">
              Service Dogs Around Town is a website that allows service dog
              handlers to save and access information about businesses as it
              relates to the safety and comfort of their service animals.
              <br />
              <br />
              Hi! I'm Danielle, a service dog handler and software developer.
              This app was created to solve a personal problem - I couldn't
              always reliabily remember which restaurants I'd visited in town
              were good choices and which I should avoid going back to. What was
              the space like? How were the staff?
              <br />
              <br />
              It's often difficult to get the information we need as service dog
              handlers to make good choices on where to visit and know what to
              expect. I was researching Google photos and reviews, checking out
              the restaurant's website and social media, and sometimes even
              having to call to find out what I needed to plan my visit.
              <br />
              <br />
              And you can't always tell from those other sources if the floor is
              dirty, sticky, or contains hazards like glass. I wanted to create
              a tool for people like myself to capture these important pieces of
              information after a visit and easily look back on it when needed.
              <br />
              <br />
              This site also makes travel easier, allowing you can look up local
              places you might be thinking of visiting and see if anyone's left
              a positive review.
              <br />
              <br />A final key piece of this website is noting where you
              encountered access issues or safety issues. Going through the
              experience of a business denying you and your service dog access,
              even though rights are protected under the ADA, can be incredibly
              stressful and may even trigger medical events. This website will
              help you know which places to avoid and see success stories of
              access issues being successfully resolved.
            </Typography>
          </section>
          <section>
            <Typography
              variant="h2"
              fontSize="h5.fontSize"
              sx={{ mb: 2, mt: 4 }}
            >
              How to Use This Website
            </Typography>
            <Typography
              variant="h3"
              fontSize="h6.fontSize"
              sx={{ mb: 2, mt: 4 }}
            >
              - View others' entries
            </Typography>
            <List component="ol">
              <ListItem>
                1. Use the "My Location" button (lower left of map) to center
                the map on your town
              </ListItem>
              <ListItem>2. Or, zoom the map to a specific city</ListItem>
              <ListItem>
                3. Click on a marker on the map or an entry on the List View to
                see detailed information about that business
              </ListItem>
            </List>
            <Typography
              variant="h3"
              fontSize="h6.fontSize"
              sx={{ mb: 2, mt: 4 }}
            >
              - Add your own entries
            </Typography>
            <List component="ol">
              <ListItem>1. Login in with Google</ListItem>
              <ListItem>2. Search for a business you have visited</ListItem>
              <ListItem>
                3. Fill out information about that business, including a private
                note if you wish
              </ListItem>
              <ListItem>
                4. Easily filter existing places to see just your entries or
                even just your favorites
              </ListItem>
            </List>
          </section>
        </Box>
      </main>
      <Footer />
    </>
  );
}

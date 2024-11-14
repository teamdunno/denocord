import { dotenv } from "jsr:@dunno/zodenv";
import { z } from "npm:zod@3.23.8";

// Schema for your .env file
// Put stuff like your bot token and more here!
const Env = z.object({
    TOKEN: z.string(),
    CLIENT_ID: z.string()
})

// This is where the magic happens
//
// This loads in your .env file and makes it
// type-safe so you get autocomplete with whatever
// editor you use!
//
// This function takes in the schema we defined and
// returns us all values we specified in .env
export default dotenv(Env);




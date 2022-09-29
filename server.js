import chalk from "chalk"
import dotenv  from "dotenv";
import colors from "colors";

import app  from "./app.js";
// import connectDb from "./config/connect.js";
// import {client} from "./config/connect.js";



//color enable
colors.enable();
//dotenv
dotenv.config();
//mongo connection
// connectDb();



app.listen(process.env.PORT || 5000,()=>{
    console.log(chalk.blue.bold('*********************'));

    console.log(chalk.blue.bold('Have a Nice Day    ❤️'));
    console.log(chalk.blue.bold('*********************'));

    console.log(chalk.green(
        'Server Is Running ' +
        chalk.blue.underline.bold(' with Port ') +
        "5000"
    ));
    console.log(chalk.blue.bgWhiteBright.bold('❤️  ❤️  ❤️  ❤️  ❤️  ❤️   ❤️  ❤️  ❤️  ❤️'));

})

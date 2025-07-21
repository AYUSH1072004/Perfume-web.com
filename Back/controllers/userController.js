import User from '../schema/userSchema.js'
import bcrypt from 'bcryptjs'

const home = async (req, res) => {
    try {
        res.status(200).json({ message: "home page" });
    } catch (error) {
        console.log({ message: "home error", error });
    }
}

const signup = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if(userExist){
            return res.status(400).json({message:"user is already exist" });
        }

        const userCreate = await User.create({
            username,
            email,
            phone,
            password:bcrypt.hashSync(password,10),
        });

        const token = await userCreate.generateToken();

        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production" ? true : false,
            sameSite:'Lax',
            maxAge:25*60*60*1000,
        });

        res.status(200).json({
            message:userCreate,
            userId:userCreate._id.toString(),
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });

    }
}

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3. Generate token
    const token = await userExist.generateToken();

    // 4. Set cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 25 * 60 * 60 * 1000,
    });

    // 5. Send response
    res.status(200).json({
      message: "Login successful",
      userId: userExist._id.toString(),
    });

  } catch (error) {
    console.log("Login error", error);
    res.status(500).json({ message: "Server error during login" });
  }
};


export default { home,signup,signin };
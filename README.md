# What is the difference between var, let, and const?
## In old JavaScript, we used var, but it had many problems because it can be used anywhere in the code and it is confusing. Now, we use let if we want to change the value later (like a counter). But if the value is fixed and never change (like an API URL), we use const. Most of the time, I use const to keep my code safe.

# What is the spread operator (...)?
## The spread operator is just three dots ... that we use to unpack things. If I have one array and I want to put all its items into a new array, I use ...arrayName. It is also very helpful for copying objects or merging two lists together very quickly without using a long loop.

# What is the difference between map(), filter(), and forEach()?
- forEach(): It is just for looping. It goes through every item but it does not give anything back.

- map(): It is for changing items. It goes through the array and gives me a new array with the changes I made.

- filter(): It is for picking items. It checks a condition and gives me a new array with only the items that pass the test (like status is "open").

# What is an arrow function?
## Arrow function is a modern way to write functions in JavaScript using =>. It makes the code look very clean and short. For junior developers, it is easy to use in things like map or filter. One important thing is it does not have its own this, it takes this from the parent.

# What are template literals?
## Instead of using single quotes or double quotes, we use backticks (`). It is very powerful because I can write variables directly inside the string using ${variable}. I don't need to use the + sign many times to join strings anymore. It also allows writing code in multiple lines easily.
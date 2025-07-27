const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import existing models from DataBase directory
const User = require('./DataBase/Model/User');
const Question = require('./DataBase/Model/Question');
const Note = require('./DataBase/Model/Note');
const Code = require('./DataBase/Model/Code');
const Query = require('./DataBase/Model/Query');

const { connectDB } = require('./DataBase/connectDB');

// Sample Questions Data (using existing schema)
const sampleQuestions = [
    {
        difficulty: "easy",
        name: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explaination: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
                explaination: "Because nums[1] + nums[2] == 6, we return [1, 2]."
            }
        ],
        noOfSubm: 150,
        noOfSuccess: 95,
        testcase: "3\n[2,7,11,15] 9\n[3,2,4] 6\n[3,3] 6"
    },
    {
        difficulty: "medium",
        name: "Reverse Integer",
        description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
        examples: [
            {
                input: "x = 123",
                output: "321",
                explaination: "Simply reverse the digits of 123 to get 321."
            },
            {
                input: "x = -123",
                output: "-321",
                explaination: "Reverse the digits and keep the negative sign."
            }
        ],
        noOfSubm: 120,
        noOfSuccess: 72,
        testcase: "3\n123\n-123\n120"
    },
    {
        difficulty: "easy",
        name: "Palindrome Number",
        description: "Given an integer x, return true if x is palindrome integer.\n\nAn integer is a palindrome when it reads the same backward as forward.",
        examples: [
            {
                input: "x = 121",
                output: "true",
                explaination: "121 reads as 121 from left to right and from right to left."
            },
            {
                input: "x = -121",
                output: "false",
                explaination: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
            }
        ],
        noOfSubm: 200,
        noOfSuccess: 160,
        testcase: "3\n121\n-121\n10"
    },
    {
        difficulty: "easy",
        name: "Binary Search",
        description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
        examples: [
            {
                input: "nums = [-1,0,3,5,9,12], target = 9",
                output: "4",
                explaination: "9 exists in nums and its index is 4"
            },
            {
                input: "nums = [-1,0,3,5,9,12], target = 2",
                output: "-1",
                explaination: "2 does not exist in nums so return -1"
            }
        ],
        noOfSubm: 80,
        noOfSuccess: 65,
        testcase: "3\n[-1,0,3,5,9,12] 9\n[-1,0,3,5,9,12] 2\n[5] 5"
    },
    {
        difficulty: "easy",
        name: "Fibonacci Number",
        description: "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.",
        examples: [
            {
                input: "n = 2",
                output: "1",
                explaination: "F(2) = F(1) + F(0) = 1 + 0 = 1."
            },
            {
                input: "n = 3",
                output: "2",
                explaination: "F(3) = F(2) + F(1) = 1 + 1 = 2."
            }
        ],
        noOfSubm: 90,
        noOfSuccess: 75,
        testcase: "4\n2\n3\n4\n5"
    },
    {
        difficulty: "hard",
        name: "Median of Two Sorted Arrays",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        examples: [
            {
                input: "nums1 = [1,3], nums2 = [2]",
                output: "2.00000",
                explaination: "merged array = [1,2,3] and median is 2."
            }
        ],
        noOfSubm: 50,
        noOfSuccess: 15,
        testcase: "2\n[1,3] [2]\n[1,2] [3,4]"
    }
];

// Sample Users Data (using existing schema)
const sampleUsers = [
    {
        name: "Alice Johnson",
        username: "alice_coder",
        email: "alice@example.com",
        passwordHash: "", // Will be set with bcrypt
        solvedQuestions: [],
        totalSubmissions: 25
    },
    {
        name: "Bob Smith",
        username: "bob_dev",
        email: "bob@example.com",
        passwordHash: "", // Will be set with bcrypt
        solvedQuestions: [],
        totalSubmissions: 15
    },
    {
        name: "Charlie Brown",
        username: "charlie_pro",
        email: "charlie@example.com",
        passwordHash: "", // Will be set with bcrypt
        solvedQuestions: [],
        totalSubmissions: 40
    },
    {
        name: "Admin User",
        username: "admin",
        email: "admin@example.com",
        passwordHash: "", // Will be set with bcrypt
        solvedQuestions: [],
        totalSubmissions: 100
    },
    {
        name: "Atharva Admin",
        username: "atharva",
        email: "atharva@example.com",
        passwordHash: "", // Will be set with bcrypt
        solvedQuestions: [],
        totalSubmissions: 200
    }
];

// Sample Code snippets
const sampleCodes = [
    {
        code: `def twoSum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []`,
        language: "py",
        user: "alice_coder"
    },
    {
        code: `class Solution {
    public int reverse(int x) {
        long result = 0;
        while (x != 0) {
            result = result * 10 + x % 10;
            x /= 10;
        }
        return (result > Integer.MAX_VALUE || result < Integer.MIN_VALUE) ? 0 : (int)result;
    }
}`,
        language: "java",
        user: "bob_dev"
    },
    {
        code: `bool isPalindrome(int x) {
    if (x < 0) return false;
    long original = x, reversed = 0;
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x /= 10;
    }
    return original == reversed;
}`,
        language: "cpp",
        user: "charlie_pro"
    },
    {
        code: `function binarySearch(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
        language: "js",
        user: "alice_coder"
    }
];

// Sample Notes Data (using existing schema)
const sampleNotes = [
    {
        title: "Two Sum - Hash Map Approach",
        desc: "Use a hash map to store the complement of each number. Time complexity: O(n), Space complexity: O(n)\n\n```python\ndef twoSum(nums, target):\n    hash_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hash_map:\n            return [hash_map[complement], i]\n        hash_map[num] = i\n    return []\n```",
        username: "alice_coder",
        access: "global",
        editable: true,
        codeid: "" // Will be set after creating codes
    },
    {
        title: "Binary Search Implementation Tips",
        desc: "Remember to handle edge cases: empty array, single element, target not found. Use left <= right condition.\n\n```cpp\nint binarySearch(vector<int>& nums, int target) {\n    int left = 0, right = nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\n```",
        username: "bob_dev",
        access: "public",
        editable: true,
        codeid: "" // Will be set after creating codes
    },
    {
        title: "Dynamic Programming Patterns",
        desc: "Common DP patterns:\n1) Fibonacci-like\n2) Grid traversal\n3) Subset sum\n4) LCS/LIS\n\nKey insight: Break down problems into smaller subproblems and store results to avoid recomputation.",
        username: "charlie_pro",
        access: "global",
        editable: false,
        codeid: ""
    },
    {
        title: "Admin Guidelines",
        desc: "Guidelines for problem creation and moderation:\n- Ensure test cases cover edge cases\n- Provide clear problem descriptions\n- Include multiple examples\n- Set appropriate difficulty levels",
        username: "atharva",
        access: "private",
        editable: true,
        codeid: ""
    },
    {
        title: "JavaScript Array Methods",
        desc: "Useful JavaScript array methods for coding interviews:\n- map(), filter(), reduce()\n- find(), findIndex()\n- some(), every()\n- sort(), reverse()\n\nExample: Finding duplicates using Set",
        username: "alice_coder",
        access: "public",
        editable: true,
        codeid: ""
    }
];

async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');
        
        // Connect to database
        await connectDB();
        
        // Clear existing data
        console.log('🧹 Clearing existing data...');
        await Promise.all([
            User.deleteMany({}),
            Question.deleteMany({}),
            Note.deleteMany({}),
            Code.deleteMany({}),
            Query.deleteMany({})
        ]);
        
        // Create users with hashed passwords
        console.log('👥 Creating sample users...');
        const usersWithHashedPasswords = await Promise.all(
            sampleUsers.map(async (user) => ({
                ...user,
                passwordHash: await bcrypt.hash('password123', 12)
            }))
        );
        const createdUsers = await User.insertMany(usersWithHashedPasswords);
        console.log(`✅ Created ${createdUsers.length} users`);
        
        // Create questions
        console.log('📝 Creating sample questions...');
        const createdQuestions = await Question.insertMany(sampleQuestions);
        console.log(`✅ Created ${createdQuestions.length} questions`);
        
        // Create code snippets
        console.log('💻 Creating sample code snippets...');
        const createdCodes = await Code.insertMany(sampleCodes);
        console.log(`✅ Created ${createdCodes.length} code snippets`);
        
        // Update notes with code IDs and create them
        console.log('📚 Creating sample notes...');
        const notesWithCodeIds = sampleNotes.map((note, index) => ({
            ...note,
            codeid: index < createdCodes.length ? createdCodes[index]._id.toString() : ""
        }));
        const createdNotes = await Note.insertMany(notesWithCodeIds);
        console.log(`✅ Created ${createdNotes.length} notes`);
        
        // Create sample queries (submissions)
        console.log('🔄 Creating sample submissions...');
        const sampleQueries = [
            {
                username: "alice_coder",
                language: "py",
                quesId: createdQuestions[0]._id.toString(),
                codeId: createdCodes[0]._id.toString(),
                quesName: "Two Sum",
                filepath: "/tmp/alice_two_sum.py",
                input: "[2,7,11,15] 9",
                testcase: "3\n[2,7,11,15] 9\n[3,2,4] 6\n[3,3] 6",
                output: {
                    msg: "Success",
                    stderr: "",
                    stdout: "[0,1]",
                    error: ""
                },
                status: "success",
                type: "submit",
                completeTime: new Date()
            },
            {
                username: "bob_dev",
                language: "java",
                quesId: createdQuestions[1]._id.toString(),
                codeId: createdCodes[1]._id.toString(),
                quesName: "Reverse Integer",
                filepath: "/tmp/bob_reverse.java",
                input: "123",
                testcase: "3\n123\n-123\n120",
                output: {
                    msg: "Success",
                    stderr: "",
                    stdout: "321",
                    error: ""
                },
                status: "success",
                type: "submit",
                completeTime: new Date()
            },
            {
                username: "charlie_pro",
                language: "cpp",
                quesId: createdQuestions[2]._id.toString(),
                codeId: createdCodes[2]._id.toString(),
                quesName: "Palindrome Number",
                filepath: "/tmp/charlie_palindrome.cpp",
                input: "121",
                testcase: "3\n121\n-121\n10",
                output: {
                    msg: "Wrong Answer",
                    stderr: "",
                    stdout: "false",
                    error: ""
                },
                status: "error",
                type: "submit",
                completeTime: new Date()
            }
        ];
        
        const createdQueries = await Query.insertMany(sampleQueries);
        console.log(`✅ Created ${createdQueries.length} submissions`);
        
        // Update users with solved questions
        console.log('🎯 Updating user solved questions...');
        await User.findOneAndUpdate(
            { username: "alice_coder" },
            { $push: { solvedQuestions: { $each: [createdQuestions[0]._id.toString(), createdQuestions[3]._id.toString()] } } }
        );
        await User.findOneAndUpdate(
            { username: "bob_dev" },
            { $push: { solvedQuestions: createdQuestions[1]._id.toString() } }
        );
        await User.findOneAndUpdate(
            { username: "charlie_pro" },
            { $push: { solvedQuestions: { $each: [createdQuestions[0]._id.toString(), createdQuestions[2]._id.toString(), createdQuestions[4]._id.toString()] } } }
        );
        
        console.log('🎉 Database seeding completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`Users: ${createdUsers.length}`);
        console.log(`Questions: ${createdQuestions.length}`);
        console.log(`Notes: ${createdNotes.length}`);
        console.log(`Code Snippets: ${createdCodes.length}`);
        console.log(`Submissions: ${createdQueries.length}`);
        
        console.log('\n🔐 Test Accounts:');
        console.log('Admin (atharva): atharva@example.com / password123');
        console.log('Admin: admin@example.com / password123');
        console.log('Alice: alice@example.com / password123');
        console.log('Bob: bob@example.com / password123');
        console.log('Charlie: charlie@example.com / password123');
        
        console.log('\n🎯 Features to Test:');
        console.log('✅ Login with test accounts');
        console.log('✅ Browse 6 coding problems');
        console.log('✅ View leaderboard with user rankings');
        console.log('✅ Read programming notes and tutorials');
        console.log('✅ Submit code solutions');
        console.log('✅ View submission history');
        
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeding function
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase };

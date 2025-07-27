import bs0 from "./bs0";


export const correctCode = {
    // Two Sum testcase
    "3\n[2,7,11,15] 9\n[3,2,4] 6\n[3,3] 6": {
        cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> hash_map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (hash_map.find(complement) != hash_map.end()) {
            return {hash_map[complement], i};
        }
        hash_map[nums[i]] = i;
    }
    return {};
}

int main() {
    // Test case implementation
    vector<int> nums1 = {2,7,11,15};
    int target1 = 9;
    vector<int> result = twoSum(nums1, target1);
    cout << "[" << result[0] << "," << result[1] << "]" << endl;
    return 0;
}`,
        py: `def twoSum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []

# Test case
nums = [2,7,11,15]
target = 9
result = twoSum(nums, target)
print(f"[{result[0]},{result[1]}]")`,
        java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {2,7,11,15};
        int target = 9;
        int[] result = sol.twoSum(nums, target);
        System.out.println("[" + result[0] + "," + result[1] + "]");
    }
}`,
        js: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// Test case
const nums = [2,7,11,15];
const target = 9;
const result = twoSum(nums, target);
console.log(\`[\${result[0]},\${result[1]}]\`);`,
        c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    
    for (int i = 0; i < numsSize - 1; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    return result;
}

int main() {
    int nums[] = {2,7,11,15};
    int target = 9;
    int returnSize;
    int* result = twoSum(nums, 4, target, &returnSize);
    printf("[%d,%d]\\n", result[0], result[1]);
    free(result);
    return 0;
}`
    },
    
    // Reverse Integer testcase
    "3\n123\n-123\n120": {
        cpp: `#include <iostream>
#include <climits>
using namespace std;

int reverse(int x) {
    long result = 0;
    while (x != 0) {
        result = result * 10 + x % 10;
        x /= 10;
    }
    return (result > INT_MAX || result < INT_MIN) ? 0 : result;
}

int main() {
    cout << reverse(123) << endl;
    cout << reverse(-123) << endl;
    cout << reverse(120) << endl;
    return 0;
}`,
        py: `def reverse(x):
    sign = -1 if x < 0 else 1
    x = abs(x)
    result = 0
    while x:
        result = result * 10 + x % 10
        x //= 10
    result *= sign
    return result if -2**31 <= result <= 2**31 - 1 else 0

print(reverse(123))
print(reverse(-123))
print(reverse(120))`,
        java: `class Solution {
    public int reverse(int x) {
        long result = 0;
        while (x != 0) {
            result = result * 10 + x % 10;
            x /= 10;
        }
        return (result > Integer.MAX_VALUE || result < Integer.MIN_VALUE) ? 0 : (int)result;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.reverse(123));
        System.out.println(sol.reverse(-123));
        System.out.println(sol.reverse(120));
    }
}`,
        js: `function reverse(x) {
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    let result = 0;
    while (x > 0) {
        result = result * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    result *= sign;
    return (result > 2**31 - 1 || result < -(2**31)) ? 0 : result;
}

console.log(reverse(123));
console.log(reverse(-123));
console.log(reverse(120));`,
        c: `#include <stdio.h>
#include <limits.h>

int reverse(int x) {
    long result = 0;
    while (x != 0) {
        result = result * 10 + x % 10;
        x /= 10;
    }
    return (result > INT_MAX || result < INT_MIN) ? 0 : result;
}

int main() {
    printf("%d\\n", reverse(123));
    printf("%d\\n", reverse(-123));
    printf("%d\\n", reverse(120));
    return 0;
}`
    },
    
    // Palindrome Number testcase
    "3\n121\n-121\n10": {
        cpp: `#include <iostream>
using namespace std;

bool isPalindrome(int x) {
    if (x < 0) return false;
    long original = x, reversed = 0;
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x /= 10;
    }
    return original == reversed;
}

int main() {
    cout << (isPalindrome(121) ? "true" : "false") << endl;
    cout << (isPalindrome(-121) ? "true" : "false") << endl;
    cout << (isPalindrome(10) ? "true" : "false") << endl;
    return 0;
}`,
        py: `def isPalindrome(x):
    if x < 0:
        return False
    original = x
    reversed_num = 0
    while x > 0:
        reversed_num = reversed_num * 10 + x % 10
        x //= 10
    return original == reversed_num

print("true" if isPalindrome(121) else "false")
print("true" if isPalindrome(-121) else "false")
print("true" if isPalindrome(10) else "false")`,
        java: `class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) return false;
        long original = x, reversed = 0;
        while (x > 0) {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }
        return original == reversed;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isPalindrome(121));
        System.out.println(sol.isPalindrome(-121));
        System.out.println(sol.isPalindrome(10));
    }
}`,
        js: `function isPalindrome(x) {
    if (x < 0) return false;
    const original = x;
    let reversed = 0;
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    return original === reversed;
}

console.log(isPalindrome(121) ? "true" : "false");
console.log(isPalindrome(-121) ? "true" : "false");
console.log(isPalindrome(10) ? "true" : "false");`,
        c: `#include <stdio.h>
#include <stdbool.h>

bool isPalindrome(int x) {
    if (x < 0) return false;
    long original = x, reversed = 0;
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x /= 10;
    }
    return original == reversed;
}

int main() {
    printf("%s\\n", isPalindrome(121) ? "true" : "false");
    printf("%s\\n", isPalindrome(-121) ? "true" : "false");
    printf("%s\\n", isPalindrome(10) ? "true" : "false");
    return 0;
}`
    },
    
    // Binary Search testcase
    "3\n[-1,0,3,5,9,12] 9\n[-1,0,3,5,9,12] 2\n[5] 5": {
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> nums1 = {-1,0,3,5,9,12};
    cout << search(nums1, 9) << endl;
    cout << search(nums1, 2) << endl;
    vector<int> nums2 = {5};
    cout << search(nums2, 5) << endl;
    return 0;
}`,
        py: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

print(search([-1,0,3,5,9,12], 9))
print(search([-1,0,3,5,9,12], 2))
print(search([5], 5))`,
        java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums1 = {-1,0,3,5,9,12};
        System.out.println(sol.search(nums1, 9));
        System.out.println(sol.search(nums1, 2));
        int[] nums2 = {5};
        System.out.println(sol.search(nums2, 5));
    }
}`,
        js: `function search(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

console.log(search([-1,0,3,5,9,12], 9));
console.log(search([-1,0,3,5,9,12], 2));
console.log(search([5], 5));`,
        c: `#include <stdio.h>

int search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    int nums1[] = {-1,0,3,5,9,12};
    printf("%d\\n", search(nums1, 6, 9));
    printf("%d\\n", search(nums1, 6, 2));
    int nums2[] = {5};
    printf("%d\\n", search(nums2, 1, 5));
    return 0;
}`
    },
    
    // Fibonacci Number testcase
    "4\n2\n3\n4\n5": {
        cpp: `#include <iostream>
using namespace std;

int fib(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

int main() {
    cout << fib(2) << endl;
    cout << fib(3) << endl;
    cout << fib(4) << endl;
    cout << fib(5) << endl;
    return 0;
}`,
        py: `def fib(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print(fib(2))
print(fib(3))
print(fib(4))
print(fib(5))`,
        java: `class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.fib(2));
        System.out.println(sol.fib(3));
        System.out.println(sol.fib(4));
        System.out.println(sol.fib(5));
    }
}`,
        js: `function fib(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}

console.log(fib(2));
console.log(fib(3));
console.log(fib(4));
console.log(fib(5));`,
        c: `#include <stdio.h>

int fib(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

int main() {
    printf("%d\\n", fib(2));
    printf("%d\\n", fib(3));
    printf("%d\\n", fib(4));
    printf("%d\\n", fib(5));
    return 0;
}`
    },
    
    // Median of Two Sorted Arrays testcase
    "2\n[1,3] [2]\n[1,2] [3,4]": {
        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    vector<int> merged;
    merged.insert(merged.end(), nums1.begin(), nums1.end());
    merged.insert(merged.end(), nums2.begin(), nums2.end());
    sort(merged.begin(), merged.end());
    
    int n = merged.size();
    if (n % 2 == 1) {
        return merged[n / 2];
    } else {
        return (merged[n / 2 - 1] + merged[n / 2]) / 2.0;
    }
}

int main() {
    vector<int> nums1 = {1,3}, nums2 = {2};
    cout << findMedianSortedArrays(nums1, nums2) << endl;
    vector<int> nums3 = {1,2}, nums4 = {3,4};
    cout << findMedianSortedArrays(nums3, nums4) << endl;
    return 0;
}`,
        py: `def findMedianSortedArrays(nums1, nums2):
    merged = sorted(nums1 + nums2)
    n = len(merged)
    if n % 2 == 1:
        return float(merged[n // 2])
    else:
        return (merged[n // 2 - 1] + merged[n // 2]) / 2.0

print(f"{findMedianSortedArrays([1,3], [2]):.5f}")
print(f"{findMedianSortedArrays([1,2], [3,4]):.5f}")`,
        java: `import java.util.*;

class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int[] merged = new int[nums1.length + nums2.length];
        System.arraycopy(nums1, 0, merged, 0, nums1.length);
        System.arraycopy(nums2, 0, merged, nums1.length, nums2.length);
        Arrays.sort(merged);
        
        int n = merged.length;
        if (n % 2 == 1) {
            return merged[n / 2];
        } else {
            return (merged[n / 2 - 1] + merged[n / 2]) / 2.0;
        }
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.printf("%.5f%n", sol.findMedianSortedArrays(new int[]{1,3}, new int[]{2}));
        System.out.printf("%.5f%n", sol.findMedianSortedArrays(new int[]{1,2}, new int[]{3,4}));
    }
}`,
        js: `function findMedianSortedArrays(nums1, nums2) {
    const merged = [...nums1, ...nums2].sort((a, b) => a - b);
    const n = merged.length;
    if (n % 2 === 1) {
        return merged[Math.floor(n / 2)];
    } else {
        return (merged[n / 2 - 1] + merged[n / 2]) / 2.0;
    }
}

console.log(findMedianSortedArrays([1,3], [2]).toFixed(5));
console.log(findMedianSortedArrays([1,2], [3,4]).toFixed(5));`,
        c: `#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {
    int totalSize = nums1Size + nums2Size;
    int* merged = (int*)malloc(totalSize * sizeof(int));
    
    for (int i = 0; i < nums1Size; i++) {
        merged[i] = nums1[i];
    }
    for (int i = 0; i < nums2Size; i++) {
        merged[nums1Size + i] = nums2[i];
    }
    
    qsort(merged, totalSize, sizeof(int), compare);
    
    double result;
    if (totalSize % 2 == 1) {
        result = merged[totalSize / 2];
    } else {
        result = (merged[totalSize / 2 - 1] + merged[totalSize / 2]) / 2.0;
    }
    
    free(merged);
    return result;
}

int main() {
    int nums1[] = {1,3}, nums2[] = {2};
    printf("%.5f\\n", findMedianSortedArrays(nums1, 2, nums2, 1));
    int nums3[] = {1,2}, nums4[] = {3,4};
    printf("%.5f\\n", findMedianSortedArrays(nums3, 2, nums4, 2));
    return 0;
}`
    }
};
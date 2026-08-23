#include <vector>

using namespace std;

class Solution {
public:
    // The recursive DFS helper function
    void dfs(vector<vector<char>>& grid, int r, int c) {
        int numRows = grid.size();
        int numCols = grid[0].size();

        // 1. BASE CASE (Out of Bounds or Water)
        // If we fall off the grid, or if we hit water ('0'), stop immediately.
        if (r < 0 || r >= numRows || c < 0 || c >= numCols || grid[r][c] == '0') {
            return;
        }

        // 2. ACTION: SINK THE ISLAND
        // Mark the current land as visited by turning it into water ('0').
        // This prevents the computer from walking in infinite circles!
        grid[r][c] = '0';

        // 3. RECURSIVE DELEGATION
        // Explore all 4 adjacent directions. 
        // The order does not matter for finding the island size/shape.
        dfs(grid, r - 1, c); // Explore UP
        dfs(grid, r + 1, c); // Explore DOWN
        dfs(grid, r, c - 1); // Explore LEFT
        dfs(grid, r, c + 1); // Explore RIGHT
    }

    // The main function that loops through the entire map
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        
        int islandCount = 0;
        int numRows = grid.size();
        int numCols = grid[0].size();

        for (int r = 0; r < numRows; r++) {
            for (int c = 0; c < numCols; c++) {
                // When we find a piece of unvisited land...
                if (grid[r][c] == '1') {
                    // We found a new island! Increment our count.
                    islandCount++;      
                    
                    // Launch the DFS to explore and sink the ENTIRE island.
                    // By the time this function finishes, all connected '1's 
                    // will be turned into '0's.
                    dfs(grid, r, c);    
                }
            }
        }

        return islandCount;
    }
};
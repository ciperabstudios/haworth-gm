const levenshteinDistance = (s1: string, s2: string): number => {
  const dp: number[][] = Array.from({ length: s1.length + 1 }, () => Array.from({ length: s2.length + 1 }, (_, j) => j));
  for (let i = 1; i <= s1.length; i++) {
    dp[i][0] = i;
    for (let j = 1; j <= s2.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j - 1] + (s1[i - 1] === s2[j - 1] ? 0 : 1),
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1
      );
    }
  }
  return dp[s1.length][s2.length];
};

export default levenshteinDistance;
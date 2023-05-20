const gradingSystem = {
  session: {
    FA21: {     
      lg: {      
        A: {
          range: [90, 100],
          lg: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
          gpa: 4.0,
        },
        "A-": { range: [85, 89], marks: [85, 86, 87, 88, 89], gpa: 3.7 },
        "B+": { range: [80, 84], marks: [80, 81, 82, 83, 84], gpa: 3.3 },
        B: { range: [75, 79], marks: [75, 76, 77, 78, 79], gpa: 3 },
        "B-": { range: [70, 74], marks: [70, 71, 72, 73, 74], gpa: 2.7 },
        "C+": { range: [65, 69], marks: [65, 66, 67, 68, 69], gpa: 2.3 },
        C: { range: [60, 64], marks: [60, 61, 62, 63, 64], gpa: 2 },
        "C-": { range: [55, 59], marks: [55, 56, 57, 58, 59], gpa: 1.7 },
        D: { range: [50, 54], marks: [50, 51, 52, 53, 54], gpa: 1.3 },
        F: {
          range: [0, 49],
          marks: Array.from({ length: 50 }, (_, i) => i),
          gpa: 0.0,
        },
        withdraw: { range: [0], marks: [0], gpa: 0.0 },
      },
    },
    SP22: {
      lg: {
        A: {
          range: [85, 100],
          marks: [
            85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
          ],
          gpa: 4.0,
        },
        "A-": { range: [80, 84], marks: [80, 81, 82, 83, 84], gpa: 3.66 },
        "B+": { range: [75, 79], marks: [75, 76, 77, 78, 79], gpa: 3.33 },
        B: { range: [71, 74], marks: [71, 72, 73, 74], gpa: 3.0 },
        "B-": {
          range: [68, 70],
          marks: [68, 69, 70, 71, 72, 73, 74],
          gpa: 2.66,
        },
        "C+": { range: [64, 67], marks: [64, 66, 67], gpa: 2.33 },
        C: { range: [61, 63], marks: [61, 62, 63], gpa: 2.0 },
        "C-": { range: [58, 60], marks: [58, 59, 60], gpa: 1.66 },
        "D+": { range: [54, 57], marks: [54, 55, 56, 57], gpa: 1.3 },
        D: { range: [50, 53], marks: [50, 51, 52, 53], gpa: 1.0 },
        F: {
          range: [0, 49],
          marks: Array.from({ length: 50 }, (_, i) => i),
          gpa: 0.0,
        },
        withdraw: { range: [0], marks: [0], gpa: 0.0 },
      },
    },
  },
};

module.exports = gradingSystem;

const WEIGHTS = {
    W1: 10,  // Unseen priority
    W4: 5,   // Likes weight
    W5: 5,   // Responses weight
    W6: 2,   // Photo weight
    W7: 5,    // Field relevance weight
};

const Weight_module = {
    math: 1,
    arabe : 1,
    francais : 1,
    anglais : 1,
    physique : 1,
    chimie : 1,
    svt : 1,
    histoire : 1,
    geo : 1,
}

// Calculate recommendation score
export const calculateScore = (question, userData) => {
    const unseenFactor = !question.viewed ? WEIGHTS.W1 : 1;
    const fieldMatch = question.tags.some(tag => 
        tag.toLowerCase() === userData?.speciality?.toLowerCase()
    ) ? WEIGHTS.W7 : 1;
    
    // Engagement metrics with logarithmic dampening
    const likesScore = Math.sign(question.sumNotes) * (WEIGHTS.W4 * Math.log(Math.abs(question.sumNotes) + 1));
    const responsesScore = WEIGHTS.W5 * Math.log(question.answers.length + 1);
    const photoScore = WEIGHTS.W6 * question.files.length ;
    const moduleScore = question?.module ? Weight_module[question.module] * 1 : 1;

    // Time decay (for posts older than 10 days)
    const daysSinceCreation = (new Date() - new Date(question.createdAt)) / (1000 * 60 * 60 * 24);
    const timeDecay = daysSinceCreation > 10 ? Math.exp(-0.1 * (daysSinceCreation - 10)) : 1;

    return unseenFactor * fieldMatch * moduleScore * (likesScore + responsesScore + photoScore) * timeDecay;
};
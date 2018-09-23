const { getUserId } = require('../utils')
const Validation = require('../validation/validation');

async function submitStory (_, args, context, info) {
    //const userId = getUserId(context);
    const submissionID = await context.prisma.mutation.createSubmission({
        data: {
            flag: true
        }
    }, ` { id } `)

    var validationResult = Validation.validate(submissionID['id'], args.content);

    const submissionObject = await context.prisma.mutation.updateSubmission({
        where: {
            id: submissionID['id']  
        },
        data: {
            flag: validationResult,
            validationApproval: validationResult          
        }
    })

    return storyDraft = await context.prisma.mutation.createStory({
        data: {
            title: args.title,
            description: args.description, 
            content: args.content,
            profileId: args.profileId,
            submission: submissionID['id'],           
            }, 
        },
        info,
    )
}

async function cloneStory (_, args, context, info) {
  //const userId = getUserId(context);
    const submissionID = await context.prisma.mutation.createSubmission({
        data: {
            flag: true
        }
    }, ` { id } `)

    var validationResult = Validation.validate(submissionID['id'], args.content);    

    const submissionObject = await context.prisma.mutation.updateSubmission({
        where: {
            id: submissionID['id']  
        },
        data: {
            flag: validationResult          
        }
    })

    return clonedDraft = await context.prisma.mutation.createStory({
        data: {
            parentStoryId: args.parentStoryId,
            isCloned: validationResult,
            title: args.title,
            description: args.description, 
            content: args.content,
            profileId: args.profileId,
            submission: submissionID['id'],           
        }, 
       }, info,
    )
}

module.exports = {
    submitStory,
}
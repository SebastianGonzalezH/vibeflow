// DSM-5 Symptom and Disorder Database
// DISCLAIMER: This is a clinical decision support tool, NOT a diagnostic instrument.
// Final diagnosis must be made by a qualified mental health professional.

import { Symptom, Disorder, DSMCategory } from '@/types';

// Category display names
export const CATEGORY_NAMES: Record<DSMCategory, string> = {
  depressive: 'Depressive Disorders',
  anxiety: 'Anxiety Disorders',
  trauma: 'Trauma & Stressor-Related',
  ocd: 'OCD & Related Disorders',
  bipolar: 'Bipolar & Related',
  psychotic: 'Psychotic Disorders',
  personality: 'Personality Disorders',
  eating: 'Eating Disorders',
  substance: 'Substance Use Disorders',
  neurodevelopmental: 'Neurodevelopmental',
  sleep: 'Sleep-Wake Disorders',
  dissociative: 'Dissociative Disorders',
};

// DSM-5 Symptoms Database
export const SYMPTOMS: Symptom[] = [
  // Depressive Symptoms
  {
    id: 'dep-1',
    name: 'Depressed Mood',
    description: 'Feeling sad, empty, hopeless, or appearing tearful most of the day, nearly every day',
    category: 'depressive',
  },
  {
    id: 'dep-2',
    name: 'Anhedonia',
    description: 'Markedly diminished interest or pleasure in all, or almost all, activities',
    category: 'depressive',
  },
  {
    id: 'dep-3',
    name: 'Weight/Appetite Changes',
    description: 'Significant weight loss/gain or decrease/increase in appetite nearly every day',
    category: 'depressive',
  },
  {
    id: 'dep-4',
    name: 'Sleep Disturbance',
    description: 'Insomnia or hypersomnia nearly every day',
    category: 'depressive',
  },
  {
    id: 'dep-5',
    name: 'Psychomotor Changes',
    description: 'Psychomotor agitation or retardation observable by others',
    category: 'depressive',
  },
  {
    id: 'dep-6',
    name: 'Fatigue',
    description: 'Fatigue or loss of energy nearly every day',
    category: 'depressive',
  },
  {
    id: 'dep-7',
    name: 'Worthlessness/Guilt',
    description: 'Feelings of worthlessness or excessive/inappropriate guilt',
    category: 'depressive',
  },
  {
    id: 'dep-8',
    name: 'Concentration Difficulties',
    description: 'Diminished ability to think, concentrate, or indecisiveness',
    category: 'depressive',
  },
  {
    id: 'dep-9',
    name: 'Suicidal Ideation',
    description: 'Recurrent thoughts of death, suicidal ideation, or suicide attempt',
    category: 'depressive',
  },
  {
    id: 'dep-10',
    name: 'Persistent Depressed Mood',
    description: 'Depressed mood for most of the day, more days than not, for at least 2 years',
    category: 'depressive',
  },

  // Anxiety Symptoms
  {
    id: 'anx-1',
    name: 'Excessive Worry',
    description: 'Excessive anxiety and worry about multiple events/activities',
    category: 'anxiety',
  },
  {
    id: 'anx-2',
    name: 'Difficulty Controlling Worry',
    description: 'Finding it difficult to control the worry',
    category: 'anxiety',
  },
  {
    id: 'anx-3',
    name: 'Restlessness',
    description: 'Feeling restless, keyed up, or on edge',
    category: 'anxiety',
  },
  {
    id: 'anx-4',
    name: 'Easily Fatigued',
    description: 'Being easily fatigued',
    category: 'anxiety',
  },
  {
    id: 'anx-5',
    name: 'Difficulty Concentrating',
    description: 'Difficulty concentrating or mind going blank',
    category: 'anxiety',
  },
  {
    id: 'anx-6',
    name: 'Irritability',
    description: 'Irritability',
    category: 'anxiety',
  },
  {
    id: 'anx-7',
    name: 'Muscle Tension',
    description: 'Muscle tension',
    category: 'anxiety',
  },
  {
    id: 'anx-8',
    name: 'Sleep Problems',
    description: 'Sleep disturbance (difficulty falling/staying asleep, restless sleep)',
    category: 'anxiety',
  },
  {
    id: 'anx-9',
    name: 'Panic Attacks',
    description: 'Recurrent unexpected panic attacks with intense fear/discomfort',
    category: 'anxiety',
  },
  {
    id: 'anx-10',
    name: 'Worry About Future Attacks',
    description: 'Persistent concern about additional panic attacks or their consequences',
    category: 'anxiety',
  },
  {
    id: 'anx-11',
    name: 'Palpitations',
    description: 'Palpitations, pounding heart, or accelerated heart rate',
    category: 'anxiety',
  },
  {
    id: 'anx-12',
    name: 'Sweating',
    description: 'Sweating during anxiety episodes',
    category: 'anxiety',
  },
  {
    id: 'anx-13',
    name: 'Trembling',
    description: 'Trembling or shaking',
    category: 'anxiety',
  },
  {
    id: 'anx-14',
    name: 'Shortness of Breath',
    description: 'Sensations of shortness of breath or smothering',
    category: 'anxiety',
  },
  {
    id: 'anx-15',
    name: 'Social Fear',
    description: 'Marked fear about social situations with potential scrutiny',
    category: 'anxiety',
  },
  {
    id: 'anx-16',
    name: 'Social Avoidance',
    description: 'Social situations are avoided or endured with intense fear',
    category: 'anxiety',
  },
  {
    id: 'anx-17',
    name: 'Specific Phobia',
    description: 'Marked fear or anxiety about a specific object or situation',
    category: 'anxiety',
  },
  {
    id: 'anx-18',
    name: 'Agoraphobia',
    description: 'Marked fear about public transportation, open/enclosed spaces, crowds, or being outside alone',
    category: 'anxiety',
  },

  // Trauma Symptoms
  {
    id: 'trm-1',
    name: 'Trauma Exposure',
    description: 'Exposure to actual or threatened death, serious injury, or sexual violence',
    category: 'trauma',
  },
  {
    id: 'trm-2',
    name: 'Intrusive Memories',
    description: 'Recurrent, involuntary, and intrusive distressing memories of the event',
    category: 'trauma',
  },
  {
    id: 'trm-3',
    name: 'Trauma Nightmares',
    description: 'Recurrent distressing dreams related to the traumatic event',
    category: 'trauma',
  },
  {
    id: 'trm-4',
    name: 'Flashbacks',
    description: 'Dissociative reactions (flashbacks) where the person feels the event is recurring',
    category: 'trauma',
  },
  {
    id: 'trm-5',
    name: 'Psychological Distress',
    description: 'Intense psychological distress at exposure to trauma cues',
    category: 'trauma',
  },
  {
    id: 'trm-6',
    name: 'Avoidance of Memories',
    description: 'Avoidance of distressing memories, thoughts, or feelings about the trauma',
    category: 'trauma',
  },
  {
    id: 'trm-7',
    name: 'Avoidance of Reminders',
    description: 'Avoidance of external reminders that arouse distressing memories',
    category: 'trauma',
  },
  {
    id: 'trm-8',
    name: 'Negative Beliefs',
    description: 'Persistent negative beliefs about oneself, others, or the world',
    category: 'trauma',
  },
  {
    id: 'trm-9',
    name: 'Distorted Blame',
    description: 'Persistent distorted cognitions about cause or consequences leading to blame',
    category: 'trauma',
  },
  {
    id: 'trm-10',
    name: 'Negative Emotional State',
    description: 'Persistent negative emotional state (fear, horror, anger, guilt, shame)',
    category: 'trauma',
  },
  {
    id: 'trm-11',
    name: 'Diminished Interest',
    description: 'Markedly diminished interest in significant activities',
    category: 'trauma',
  },
  {
    id: 'trm-12',
    name: 'Detachment',
    description: 'Feelings of detachment or estrangement from others',
    category: 'trauma',
  },
  {
    id: 'trm-13',
    name: 'Inability to Feel Positive',
    description: 'Persistent inability to experience positive emotions',
    category: 'trauma',
  },
  {
    id: 'trm-14',
    name: 'Hypervigilance',
    description: 'Hypervigilance',
    category: 'trauma',
  },
  {
    id: 'trm-15',
    name: 'Exaggerated Startle',
    description: 'Exaggerated startle response',
    category: 'trauma',
  },
  {
    id: 'trm-16',
    name: 'Reckless Behavior',
    description: 'Reckless or self-destructive behavior',
    category: 'trauma',
  },

  // OCD Symptoms
  {
    id: 'ocd-1',
    name: 'Obsessions',
    description: 'Recurrent, persistent, intrusive thoughts, urges, or images causing anxiety',
    category: 'ocd',
  },
  {
    id: 'ocd-2',
    name: 'Compulsions',
    description: 'Repetitive behaviors or mental acts performed to reduce anxiety',
    category: 'ocd',
  },
  {
    id: 'ocd-3',
    name: 'Time-Consuming',
    description: 'Obsessions/compulsions are time-consuming (>1 hour/day)',
    category: 'ocd',
  },
  {
    id: 'ocd-4',
    name: 'Contamination Fears',
    description: 'Obsessive fears of contamination',
    category: 'ocd',
  },
  {
    id: 'ocd-5',
    name: 'Checking Behaviors',
    description: 'Compulsive checking behaviors',
    category: 'ocd',
  },
  {
    id: 'ocd-6',
    name: 'Ordering/Symmetry',
    description: 'Need for symmetry, ordering, or exactness',
    category: 'ocd',
  },
  {
    id: 'ocd-7',
    name: 'Hair Pulling',
    description: 'Recurrent pulling out of hair resulting in hair loss',
    category: 'ocd',
  },
  {
    id: 'ocd-8',
    name: 'Skin Picking',
    description: 'Recurrent skin picking resulting in skin lesions',
    category: 'ocd',
  },
  {
    id: 'ocd-9',
    name: 'Body Dysmorphic Concerns',
    description: 'Preoccupation with perceived defects in physical appearance',
    category: 'ocd',
  },

  // Bipolar Symptoms
  {
    id: 'bip-1',
    name: 'Elevated Mood',
    description: 'Abnormally elevated, expansive, or irritable mood',
    category: 'bipolar',
  },
  {
    id: 'bip-2',
    name: 'Increased Energy',
    description: 'Abnormally increased goal-directed activity or energy',
    category: 'bipolar',
  },
  {
    id: 'bip-3',
    name: 'Inflated Self-Esteem',
    description: 'Inflated self-esteem or grandiosity',
    category: 'bipolar',
  },
  {
    id: 'bip-4',
    name: 'Decreased Sleep Need',
    description: 'Decreased need for sleep (feels rested after few hours)',
    category: 'bipolar',
  },
  {
    id: 'bip-5',
    name: 'Pressured Speech',
    description: 'More talkative than usual or pressure to keep talking',
    category: 'bipolar',
  },
  {
    id: 'bip-6',
    name: 'Racing Thoughts',
    description: 'Flight of ideas or racing thoughts',
    category: 'bipolar',
  },
  {
    id: 'bip-7',
    name: 'Distractibility',
    description: 'Distractibility reported or observed',
    category: 'bipolar',
  },
  {
    id: 'bip-8',
    name: 'Increased Activity',
    description: 'Increase in goal-directed activity or psychomotor agitation',
    category: 'bipolar',
  },
  {
    id: 'bip-9',
    name: 'Risky Behavior',
    description: 'Excessive involvement in activities with high potential for painful consequences',
    category: 'bipolar',
  },
  {
    id: 'bip-10',
    name: 'Mood Cycling',
    description: 'Distinct periods of mood disturbance cycling between depression and mania/hypomania',
    category: 'bipolar',
  },

  // Psychotic Symptoms
  {
    id: 'psy-1',
    name: 'Delusions',
    description: 'Fixed beliefs not amenable to change despite conflicting evidence',
    category: 'psychotic',
  },
  {
    id: 'psy-2',
    name: 'Hallucinations',
    description: 'Perception-like experiences without external stimulus',
    category: 'psychotic',
  },
  {
    id: 'psy-3',
    name: 'Disorganized Speech',
    description: 'Disorganized speech (derailment, incoherence)',
    category: 'psychotic',
  },
  {
    id: 'psy-4',
    name: 'Disorganized Behavior',
    description: 'Grossly disorganized or catatonic behavior',
    category: 'psychotic',
  },
  {
    id: 'psy-5',
    name: 'Negative Symptoms',
    description: 'Negative symptoms (diminished emotional expression, avolition)',
    category: 'psychotic',
  },
  {
    id: 'psy-6',
    name: 'Social/Occupational Dysfunction',
    description: 'Level of functioning markedly below prior achievement level',
    category: 'psychotic',
  },

  // Personality Disorder Symptoms
  {
    id: 'per-1',
    name: 'Unstable Relationships',
    description: 'Pattern of unstable, intense interpersonal relationships',
    category: 'personality',
  },
  {
    id: 'per-2',
    name: 'Identity Disturbance',
    description: 'Markedly unstable self-image or sense of self',
    category: 'personality',
  },
  {
    id: 'per-3',
    name: 'Impulsivity',
    description: 'Impulsivity in potentially self-damaging areas',
    category: 'personality',
  },
  {
    id: 'per-4',
    name: 'Suicidal/Self-Harm Behaviors',
    description: 'Recurrent suicidal behavior, gestures, threats, or self-mutilating behavior',
    category: 'personality',
  },
  {
    id: 'per-5',
    name: 'Affective Instability',
    description: 'Affective instability due to marked mood reactivity',
    category: 'personality',
  },
  {
    id: 'per-6',
    name: 'Chronic Emptiness',
    description: 'Chronic feelings of emptiness',
    category: 'personality',
  },
  {
    id: 'per-7',
    name: 'Inappropriate Anger',
    description: 'Inappropriate, intense anger or difficulty controlling anger',
    category: 'personality',
  },
  {
    id: 'per-8',
    name: 'Paranoid Ideation',
    description: 'Transient, stress-related paranoid ideation or dissociative symptoms',
    category: 'personality',
  },
  {
    id: 'per-9',
    name: 'Fear of Abandonment',
    description: 'Frantic efforts to avoid real or imagined abandonment',
    category: 'personality',
  },
  {
    id: 'per-10',
    name: 'Grandiosity',
    description: 'Grandiose sense of self-importance',
    category: 'personality',
  },
  {
    id: 'per-11',
    name: 'Need for Admiration',
    description: 'Need for excessive admiration',
    category: 'personality',
  },
  {
    id: 'per-12',
    name: 'Lack of Empathy',
    description: 'Lack of empathy, unwilling to recognize feelings of others',
    category: 'personality',
  },
  {
    id: 'per-13',
    name: 'Social Detachment',
    description: 'Detachment from social relationships, restricted emotional expression',
    category: 'personality',
  },
  {
    id: 'per-14',
    name: 'Suspiciousness',
    description: 'Pervasive distrust and suspiciousness of others',
    category: 'personality',
  },
  {
    id: 'per-15',
    name: 'Disregard for Others',
    description: 'Disregard for and violation of the rights of others',
    category: 'personality',
  },

  // Eating Disorder Symptoms
  {
    id: 'eat-1',
    name: 'Restriction of Intake',
    description: 'Restriction of energy intake leading to significantly low body weight',
    category: 'eating',
  },
  {
    id: 'eat-2',
    name: 'Fear of Weight Gain',
    description: 'Intense fear of gaining weight or becoming fat',
    category: 'eating',
  },
  {
    id: 'eat-3',
    name: 'Body Image Disturbance',
    description: 'Disturbance in body weight/shape experience or denial of seriousness',
    category: 'eating',
  },
  {
    id: 'eat-4',
    name: 'Binge Eating',
    description: 'Recurrent episodes of eating large amounts with lack of control',
    category: 'eating',
  },
  {
    id: 'eat-5',
    name: 'Compensatory Behaviors',
    description: 'Recurrent compensatory behaviors to prevent weight gain',
    category: 'eating',
  },
  {
    id: 'eat-6',
    name: 'Self-Evaluation by Shape',
    description: 'Self-evaluation unduly influenced by body shape and weight',
    category: 'eating',
  },

  // Substance Use Symptoms
  {
    id: 'sub-1',
    name: 'Larger Amounts/Longer',
    description: 'Substance taken in larger amounts or over longer period than intended',
    category: 'substance',
  },
  {
    id: 'sub-2',
    name: 'Unsuccessful Control',
    description: 'Persistent desire or unsuccessful efforts to cut down/control use',
    category: 'substance',
  },
  {
    id: 'sub-3',
    name: 'Time Spent',
    description: 'Great deal of time spent obtaining, using, or recovering from substance',
    category: 'substance',
  },
  {
    id: 'sub-4',
    name: 'Craving',
    description: 'Craving or strong desire to use the substance',
    category: 'substance',
  },
  {
    id: 'sub-5',
    name: 'Role Obligation Failure',
    description: 'Recurrent use resulting in failure to fulfill major role obligations',
    category: 'substance',
  },
  {
    id: 'sub-6',
    name: 'Continued Despite Problems',
    description: 'Continued use despite persistent social/interpersonal problems',
    category: 'substance',
  },
  {
    id: 'sub-7',
    name: 'Activities Given Up',
    description: 'Important activities given up or reduced because of use',
    category: 'substance',
  },
  {
    id: 'sub-8',
    name: 'Hazardous Use',
    description: 'Recurrent use in physically hazardous situations',
    category: 'substance',
  },
  {
    id: 'sub-9',
    name: 'Tolerance',
    description: 'Tolerance (need for increased amounts or diminished effect)',
    category: 'substance',
  },
  {
    id: 'sub-10',
    name: 'Withdrawal',
    description: 'Withdrawal symptoms or use to relieve/avoid withdrawal',
    category: 'substance',
  },

  // Neurodevelopmental Symptoms
  {
    id: 'neu-1',
    name: 'Inattention',
    description: 'Pattern of inattention interfering with functioning/development',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-2',
    name: 'Hyperactivity',
    description: 'Pattern of hyperactivity-impulsivity interfering with functioning',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-3',
    name: 'Careless Mistakes',
    description: 'Often fails to give close attention or makes careless mistakes',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-4',
    name: 'Difficulty Sustaining Attention',
    description: 'Difficulty sustaining attention in tasks or play',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-5',
    name: 'Does Not Listen',
    description: 'Often does not seem to listen when spoken to directly',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-6',
    name: 'Fails to Finish',
    description: 'Often fails to follow through on instructions or finish tasks',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-7',
    name: 'Organization Difficulty',
    description: 'Often has difficulty organizing tasks and activities',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-8',
    name: 'Avoids Sustained Effort',
    description: 'Often avoids tasks requiring sustained mental effort',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-9',
    name: 'Loses Things',
    description: 'Often loses things necessary for tasks or activities',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-10',
    name: 'Easily Distracted',
    description: 'Often easily distracted by extraneous stimuli',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-11',
    name: 'Forgetful',
    description: 'Often forgetful in daily activities',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-12',
    name: 'Fidgets',
    description: 'Often fidgets or squirms in seat',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-13',
    name: 'Leaves Seat',
    description: 'Often leaves seat in situations where remaining seated is expected',
    category: 'neurodevelopmental',
  },
  {
    id: 'neu-14',
    name: 'Runs/Climbs Excessively',
    description: 'Often runs about or climbs in inappropriate situations',
    category: 'neurodevelopmental',
  },

  // Sleep Symptoms
  {
    id: 'slp-1',
    name: 'Difficulty Initiating Sleep',
    description: 'Difficulty initiating sleep',
    category: 'sleep',
  },
  {
    id: 'slp-2',
    name: 'Difficulty Maintaining Sleep',
    description: 'Difficulty maintaining sleep',
    category: 'sleep',
  },
  {
    id: 'slp-3',
    name: 'Early Awakening',
    description: 'Early-morning awakening with inability to return to sleep',
    category: 'sleep',
  },
  {
    id: 'slp-4',
    name: 'Excessive Sleepiness',
    description: 'Excessive sleepiness despite main sleep period of 7+ hours',
    category: 'sleep',
  },
  {
    id: 'slp-5',
    name: 'Nightmares',
    description: 'Repeated occurrences of extended, dysphoric, well-remembered dreams',
    category: 'sleep',
  },

  // Dissociative Symptoms
  {
    id: 'dis-1',
    name: 'Depersonalization',
    description: 'Experiences of unreality or detachment from mind, self, or body',
    category: 'dissociative',
  },
  {
    id: 'dis-2',
    name: 'Derealization',
    description: 'Experiences of unreality of surroundings',
    category: 'dissociative',
  },
  {
    id: 'dis-3',
    name: 'Dissociative Amnesia',
    description: 'Inability to recall important autobiographical information',
    category: 'dissociative',
  },
  {
    id: 'dis-4',
    name: 'Identity Disruption',
    description: 'Disruption of identity characterized by two or more distinct personality states',
    category: 'dissociative',
  },
];

// DSM-5 Disorders Database
export const DISORDERS: Disorder[] = [
  // Depressive Disorders
  {
    id: 'mdd',
    name: 'Major Depressive Disorder',
    code: 'F32/F33',
    category: 'depressive',
    description: 'Episodes of depressed mood or loss of interest with additional symptoms for at least 2 weeks',
    requiredSymptoms: ['dep-1', 'dep-2', 'dep-3', 'dep-4', 'dep-5', 'dep-6', 'dep-7', 'dep-8', 'dep-9'],
    minimumSymptoms: 5,
    duration: 'At least 2 weeks',
  },
  {
    id: 'pdd',
    name: 'Persistent Depressive Disorder (Dysthymia)',
    code: 'F34.1',
    category: 'depressive',
    description: 'Chronic depressed mood for at least 2 years with additional symptoms',
    requiredSymptoms: ['dep-10', 'dep-3', 'dep-4', 'dep-6', 'dep-7', 'dep-8'],
    minimumSymptoms: 3,
    duration: 'At least 2 years',
  },

  // Anxiety Disorders
  {
    id: 'gad',
    name: 'Generalized Anxiety Disorder',
    code: 'F41.1',
    category: 'anxiety',
    description: 'Excessive anxiety and worry occurring more days than not for at least 6 months',
    requiredSymptoms: ['anx-1', 'anx-2', 'anx-3', 'anx-4', 'anx-5', 'anx-6', 'anx-7', 'anx-8'],
    minimumSymptoms: 4,
    duration: 'At least 6 months',
  },
  {
    id: 'panic',
    name: 'Panic Disorder',
    code: 'F41.0',
    category: 'anxiety',
    description: 'Recurrent unexpected panic attacks with persistent concern about additional attacks',
    requiredSymptoms: ['anx-9', 'anx-10', 'anx-11', 'anx-12', 'anx-13', 'anx-14'],
    minimumSymptoms: 3,
    duration: 'At least 1 month of concern about attacks',
  },
  {
    id: 'social-anxiety',
    name: 'Social Anxiety Disorder',
    code: 'F40.10',
    category: 'anxiety',
    description: 'Marked fear or anxiety about social situations involving scrutiny',
    requiredSymptoms: ['anx-15', 'anx-16'],
    minimumSymptoms: 2,
    duration: 'At least 6 months',
  },
  {
    id: 'specific-phobia',
    name: 'Specific Phobia',
    code: 'F40.2xx',
    category: 'anxiety',
    description: 'Marked fear or anxiety about a specific object or situation',
    requiredSymptoms: ['anx-17'],
    minimumSymptoms: 1,
    duration: 'At least 6 months',
  },
  {
    id: 'agoraphobia',
    name: 'Agoraphobia',
    code: 'F40.00',
    category: 'anxiety',
    description: 'Marked fear about public spaces, crowds, or being outside alone',
    requiredSymptoms: ['anx-18'],
    minimumSymptoms: 1,
    duration: 'At least 6 months',
  },

  // Trauma Disorders
  {
    id: 'ptsd',
    name: 'Post-Traumatic Stress Disorder',
    code: 'F43.10',
    category: 'trauma',
    description: 'Exposure to traumatic event with intrusion, avoidance, negative alterations, and arousal symptoms',
    requiredSymptoms: ['trm-1', 'trm-2', 'trm-3', 'trm-4', 'trm-5', 'trm-6', 'trm-7', 'trm-8', 'trm-9', 'trm-10', 'trm-11', 'trm-12', 'trm-13', 'trm-14', 'trm-15', 'trm-16'],
    minimumSymptoms: 6,
    duration: 'More than 1 month',
  },
  {
    id: 'acute-stress',
    name: 'Acute Stress Disorder',
    code: 'F43.0',
    category: 'trauma',
    description: 'Similar to PTSD but occurring 3 days to 1 month after trauma',
    requiredSymptoms: ['trm-1', 'trm-2', 'trm-3', 'trm-4', 'trm-5', 'trm-6', 'trm-7', 'trm-10', 'trm-14', 'trm-15'],
    minimumSymptoms: 5,
    duration: '3 days to 1 month after trauma',
  },

  // OCD Disorders
  {
    id: 'ocd',
    name: 'Obsessive-Compulsive Disorder',
    code: 'F42.2',
    category: 'ocd',
    description: 'Presence of obsessions, compulsions, or both that are time-consuming',
    requiredSymptoms: ['ocd-1', 'ocd-2', 'ocd-3', 'ocd-4', 'ocd-5', 'ocd-6'],
    minimumSymptoms: 2,
  },
  {
    id: 'trichotillomania',
    name: 'Trichotillomania',
    code: 'F63.3',
    category: 'ocd',
    description: 'Recurrent pulling out of hair resulting in hair loss',
    requiredSymptoms: ['ocd-7'],
    minimumSymptoms: 1,
  },
  {
    id: 'excoriation',
    name: 'Excoriation (Skin-Picking) Disorder',
    code: 'L98.1',
    category: 'ocd',
    description: 'Recurrent skin picking resulting in skin lesions',
    requiredSymptoms: ['ocd-8'],
    minimumSymptoms: 1,
  },
  {
    id: 'bdd',
    name: 'Body Dysmorphic Disorder',
    code: 'F45.22',
    category: 'ocd',
    description: 'Preoccupation with perceived defects in physical appearance',
    requiredSymptoms: ['ocd-9'],
    minimumSymptoms: 1,
  },

  // Bipolar Disorders
  {
    id: 'bipolar-i',
    name: 'Bipolar I Disorder',
    code: 'F31.x',
    category: 'bipolar',
    description: 'At least one manic episode, which may be preceded or followed by hypomanic or depressive episodes',
    requiredSymptoms: ['bip-1', 'bip-2', 'bip-3', 'bip-4', 'bip-5', 'bip-6', 'bip-7', 'bip-8', 'bip-9'],
    minimumSymptoms: 4,
    duration: 'Manic episode lasting at least 1 week',
  },
  {
    id: 'bipolar-ii',
    name: 'Bipolar II Disorder',
    code: 'F31.81',
    category: 'bipolar',
    description: 'At least one hypomanic episode and at least one major depressive episode',
    requiredSymptoms: ['bip-1', 'bip-2', 'bip-3', 'bip-4', 'bip-5', 'bip-6', 'bip-7', 'bip-8', 'bip-9', 'bip-10'],
    minimumSymptoms: 4,
    duration: 'Hypomanic episode lasting at least 4 days',
  },

  // Psychotic Disorders
  {
    id: 'schizophrenia',
    name: 'Schizophrenia',
    code: 'F20.9',
    category: 'psychotic',
    description: 'Two or more characteristic symptoms, with continuous signs for at least 6 months',
    requiredSymptoms: ['psy-1', 'psy-2', 'psy-3', 'psy-4', 'psy-5', 'psy-6'],
    minimumSymptoms: 2,
    duration: 'At least 6 months',
  },

  // Personality Disorders
  {
    id: 'bpd',
    name: 'Borderline Personality Disorder',
    code: 'F60.3',
    category: 'personality',
    description: 'Pattern of instability in interpersonal relationships, self-image, affects, and marked impulsivity',
    requiredSymptoms: ['per-1', 'per-2', 'per-3', 'per-4', 'per-5', 'per-6', 'per-7', 'per-8', 'per-9'],
    minimumSymptoms: 5,
  },
  {
    id: 'npd',
    name: 'Narcissistic Personality Disorder',
    code: 'F60.81',
    category: 'personality',
    description: 'Pattern of grandiosity, need for admiration, and lack of empathy',
    requiredSymptoms: ['per-10', 'per-11', 'per-12'],
    minimumSymptoms: 3,
  },
  {
    id: 'aspd',
    name: 'Antisocial Personality Disorder',
    code: 'F60.2',
    category: 'personality',
    description: 'Pattern of disregard for and violation of the rights of others',
    requiredSymptoms: ['per-15', 'per-3'],
    minimumSymptoms: 2,
  },

  // Eating Disorders
  {
    id: 'anorexia',
    name: 'Anorexia Nervosa',
    code: 'F50.0x',
    category: 'eating',
    description: 'Restriction of energy intake, intense fear of gaining weight, body image disturbance',
    requiredSymptoms: ['eat-1', 'eat-2', 'eat-3'],
    minimumSymptoms: 3,
  },
  {
    id: 'bulimia',
    name: 'Bulimia Nervosa',
    code: 'F50.2',
    category: 'eating',
    description: 'Recurrent binge eating with compensatory behaviors',
    requiredSymptoms: ['eat-4', 'eat-5', 'eat-6'],
    minimumSymptoms: 3,
    duration: 'At least once a week for 3 months',
  },
  {
    id: 'bed',
    name: 'Binge-Eating Disorder',
    code: 'F50.81',
    category: 'eating',
    description: 'Recurrent episodes of binge eating without compensatory behaviors',
    requiredSymptoms: ['eat-4'],
    minimumSymptoms: 1,
    duration: 'At least once a week for 3 months',
  },

  // Substance Use Disorders
  {
    id: 'sud',
    name: 'Substance Use Disorder',
    code: 'F1x.xx',
    category: 'substance',
    description: 'Problematic pattern of substance use leading to clinically significant impairment',
    requiredSymptoms: ['sub-1', 'sub-2', 'sub-3', 'sub-4', 'sub-5', 'sub-6', 'sub-7', 'sub-8', 'sub-9', 'sub-10'],
    minimumSymptoms: 2,
    duration: 'Within a 12-month period',
  },

  // ADHD
  {
    id: 'adhd-combined',
    name: 'ADHD Combined Presentation',
    code: 'F90.2',
    category: 'neurodevelopmental',
    description: 'Meets criteria for both inattention and hyperactivity-impulsivity',
    requiredSymptoms: ['neu-1', 'neu-2', 'neu-3', 'neu-4', 'neu-5', 'neu-6', 'neu-7', 'neu-8', 'neu-9', 'neu-10', 'neu-11', 'neu-12', 'neu-13', 'neu-14'],
    minimumSymptoms: 6,
    duration: 'Symptoms present before age 12',
  },
  {
    id: 'adhd-inattentive',
    name: 'ADHD Predominantly Inattentive',
    code: 'F90.0',
    category: 'neurodevelopmental',
    description: 'Meets criteria for inattention but not hyperactivity-impulsivity',
    requiredSymptoms: ['neu-1', 'neu-3', 'neu-4', 'neu-5', 'neu-6', 'neu-7', 'neu-8', 'neu-9', 'neu-10', 'neu-11'],
    minimumSymptoms: 6,
    duration: 'Symptoms present before age 12',
  },

  // Sleep Disorders
  {
    id: 'insomnia',
    name: 'Insomnia Disorder',
    code: 'F51.01',
    category: 'sleep',
    description: 'Predominant complaint of dissatisfaction with sleep quantity or quality',
    requiredSymptoms: ['slp-1', 'slp-2', 'slp-3'],
    minimumSymptoms: 1,
    duration: 'At least 3 nights per week for at least 3 months',
  },
  {
    id: 'hypersomnolence',
    name: 'Hypersomnolence Disorder',
    code: 'F51.11',
    category: 'sleep',
    description: 'Excessive sleepiness despite adequate sleep',
    requiredSymptoms: ['slp-4'],
    minimumSymptoms: 1,
    duration: 'At least 3 times per week for at least 3 months',
  },
  {
    id: 'nightmare',
    name: 'Nightmare Disorder',
    code: 'F51.5',
    category: 'sleep',
    description: 'Repeated occurrences of extended, dysphoric, well-remembered dreams',
    requiredSymptoms: ['slp-5'],
    minimumSymptoms: 1,
  },

  // Dissociative Disorders
  {
    id: 'dpdr',
    name: 'Depersonalization/Derealization Disorder',
    code: 'F48.1',
    category: 'dissociative',
    description: 'Persistent experiences of depersonalization, derealization, or both',
    requiredSymptoms: ['dis-1', 'dis-2'],
    minimumSymptoms: 1,
  },
  {
    id: 'dissociative-amnesia',
    name: 'Dissociative Amnesia',
    code: 'F44.0',
    category: 'dissociative',
    description: 'Inability to recall important autobiographical information',
    requiredSymptoms: ['dis-3'],
    minimumSymptoms: 1,
  },
  {
    id: 'did',
    name: 'Dissociative Identity Disorder',
    code: 'F44.81',
    category: 'dissociative',
    description: 'Disruption of identity characterized by two or more distinct personality states',
    requiredSymptoms: ['dis-4', 'dis-3'],
    minimumSymptoms: 2,
  },
];

// Helper function to get symptoms by category
export function getSymptomsByCategory(category: DSMCategory): Symptom[] {
  return SYMPTOMS.filter(s => s.category === category);
}

// Helper function to get disorders by category
export function getDisordersByCategory(category: DSMCategory): Disorder[] {
  return DISORDERS.filter(d => d.category === category);
}

// Helper function to calculate disorder matches based on symptoms
export function calculateDisorderMatches(selectedSymptomIds: string[]): {
  disorderId: string;
  name: string;
  code: string;
  matchedSymptoms: string[];
  totalRequired: number;
  minimumRequired: number;
  confidence: 'low' | 'moderate' | 'high';
  percentage: number;
}[] {
  const matches = DISORDERS.map(disorder => {
    const matchedSymptoms = disorder.requiredSymptoms.filter(symptomId =>
      selectedSymptomIds.includes(symptomId)
    );
    const percentage = Math.round((matchedSymptoms.length / disorder.minimumSymptoms) * 100);

    let confidence: 'low' | 'moderate' | 'high' = 'low';
    if (percentage >= 100) {
      confidence = 'high';
    } else if (percentage >= 60) {
      confidence = 'moderate';
    }

    return {
      disorderId: disorder.id,
      name: disorder.name,
      code: disorder.code,
      matchedSymptoms,
      totalRequired: disorder.requiredSymptoms.length,
      minimumRequired: disorder.minimumSymptoms,
      confidence,
      percentage: Math.min(percentage, 100),
    };
  });

  // Sort by percentage descending and filter out matches with 0 symptoms
  return matches
    .filter(m => m.matchedSymptoms.length > 0)
    .sort((a, b) => b.percentage - a.percentage);
}

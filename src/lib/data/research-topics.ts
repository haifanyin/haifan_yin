import type { ResearchTopic } from "@/types";

// ==================== RESEARCH ====================
// NOTE: Paper associations are managed via Publication.topicIds in publications.ts.
export const researchTopics: ResearchTopic[] = [
  {
    id: "rydberg-atomic-receiver",
    title: "Rydberg Atomic Receiver",
    image: "/research/research-rydberg-atomic-receiver.jpg",
    description:
      "Rydberg atomic receivers (RAREs) represent a paradigm shift from classical RF receivers to quantum-sensing-based receivers. By exploiting the giant electric dipole moments of highly excited Rydberg atoms, RAREs can sense electromagnetic fields with extraordinary sensitivity while being inherently immune to thermal noise. Our research pioneers the integration of Rydberg atomic receivers into wireless communication and sensing from a signal processing perspective. We have proposed Rydberg-atom-based superdirective receiver arrays that overcome the white noise sensitivity and mutual coupling limitations plaguing conventional compact arrays, achieving superdirectivity gains in a fundamentally new architecture. We have also developed imaging-based spectral estimation (ISE) methods that enable multi-target Direction-of-Arrival (DoA) estimation using only a single Rydberg vapor cell, transforming the spatially-resolved fluorescence profile into a spectral estimation problem solvable by Prony's method. These works open new avenues for holographic MIMO, continuous-aperture quantum sensing, and next-generation 6G receiver architectures.",
    relatedTopics: ['superdirective', 'holographic'],
  },
  {
    id: "massive-mimo",
    title: "Massive MIMO",
    image: "/research/research-massive-mimo.jpg",
    description:
      "Massive MIMO is one of the key enablers of the 5G cellular systems. Compared to traditional MIMO with fewer base station antennas, massive MIMO can offer unprecedented spectral efficiency gains. Despite the technology hype and great expectations, some of the latest field trials have unfortunately been disappointing when it comes to actual system performance in mobility scenarios. It was observed that moderate-mobility at 30 km/h leads to as much as 50% performance reduction versus low-mobility at 3 km/h.",
    topCollaborator: { name: 'D. Gesbert', initials: 'DG', paperCount: 3 },
    relatedTopics: ['fdd-mimo', 'channel-prediction'],
  },
  {
    id: "ris",
    title: "Reconfigurable Intelligent Surface (RIS)",
    image: "/research/research-ris.jpg",
    description:
      "RIS is an emerging technology for 6G wireless networks that can smartly reconfigure the wireless propagation environment. Our lab has been at the forefront of RIS research, conducting real-world prototyping and field trials. We have built one of the world's first RIS prototypes and demonstrated its performance in both indoor and outdoor environments. Our work on RIS-aided communications received the 2024 Stephen O. Rice Prize and the IEEE ComSoc Best Readings on RIS.",
    topCollaborator: { name: 'L. Tan', initials: 'LT', paperCount: 4 },
    relatedTopics: ['holographic'],
  },
  {
    id: "fdd-mimo",
    title: "FDD Massive MIMO",
    parentId: "massive-mimo",
    image: "/research/research-fdd-mimo.jpg",
    description:
      "In frequency division duplex (FDD) massive MIMO systems, acquiring accurate downlink channel state information (CSI) at the base station is fundamentally challenging due to the lack of channel reciprocity. Our research explores partial reciprocity-based channel prediction, manifold learning-based CSI feedback, and codebook design to bridge the FDD CSI gap, achieving near-optimal performance with minimal overhead.",
    topCollaborator: { name: 'D. Gesbert', initials: 'DG', paperCount: 2 },
    relatedTopics: ['massive-mimo', 'channel-prediction'],
  },
  {
    id: "superdirective",
    title: "Superdirective Antenna Arrays",
    image: "/research/research-superdirective.jpg",
    description:
      "Superdirective antenna arrays can achieve directivity far beyond the conventional limit through careful control of element coupling and excitation. Our research pioneers coupling matrix-based beamforming methods for superdirective arrays, addressing practical challenges such as excitation power constraints and sensitivity. We have achieved M² directivity in compact arrays and demonstrated multi-user communication gains through superdirectivity-enhanced beamforming.",
    topCollaborator: { name: 'L. Han', initials: 'LH', paperCount: 4 },
    relatedTopics: [],
  },
  {
    id: "channel-prediction",
    title: "Channel Prediction",
    image: "/research/research-channel-prediction.jpg",
    description:
      "Accurate channel prediction is essential for realizing the full potential of massive MIMO in mobile environments. Our work spans from angular-delay domain channel prediction using Prony-based methods, to spatio-temporal neural network approaches, to near-field channel prediction based on wavefront transformation for extremely large antenna arrays. We address both far-field and near-field scenarios with mobility.",
    topCollaborator: { name: 'W. Li', initials: 'WL', paperCount: 3 },
    relatedTopics: ['massive-mimo', 'fdd-mimo'],
  },
  {
    id: "holographic",
    title: "Holographic & Metasurface Antennas",
    image: "/research/research-holographic.jpg",
    description:
      "Holographic interference surfaces (HIS) and dynamic metasurface antennas (DMA) represent a new paradigm in antenna design, enabling continuous aperture reconfiguration for beamforming and channel sensing. Our research covers channel sensing methods based on the principle of interferometry, quantum genetic interference mitigation algorithms for DMA, and active transmissive RIS prototyping with field trials.",
    topCollaborator: { name: 'R. Song', initials: 'RS', paperCount: 2 },
    relatedTopics: ['ris'],
  },
];
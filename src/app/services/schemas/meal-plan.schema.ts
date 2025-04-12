import { Type } from '@google/genai';

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Meal {
  name: string;
  ingredients: Ingredient[];
}

export interface DayMeals {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

export interface WeeklyMealPlan {
  monday: DayMeals;
  tuesday: DayMeals;
  wednesday: DayMeals;
  thursday: DayMeals;
  friday: DayMeals;
  saturday: DayMeals;
  sunday: DayMeals;
}

export const mealPlanSchema = {
  type: Type.OBJECT,
  properties: {
    monday: {
      type: Type.OBJECT,
      properties: {
        breakfast: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        lunch: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        dinner: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        }
      },
      required: ["breakfast", "lunch", "dinner"]
    },
    tuesday: {
      type: Type.OBJECT,
      properties: {
        breakfast: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        lunch: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        dinner: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        }
      },
      required: ["breakfast", "lunch", "dinner"]
    },
    wednesday: {
      type: Type.OBJECT,
      properties: {
        breakfast: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        lunch: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        dinner: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        }
      },
      required: ["breakfast", "lunch", "dinner"]
    },
    thursday: {
      type: Type.OBJECT,
      properties: {
        breakfast: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        lunch: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        dinner: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        }
      },
      required: ["breakfast", "lunch", "dinner"]
    },
    friday: {
      type: Type.OBJECT,
      properties: {
        breakfast: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        lunch: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        dinner: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        }
      },
      required: ["breakfast", "lunch", "dinner"]
    },
    saturday: {
      type: Type.OBJECT,
      properties: {
        breakfast: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        lunch: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        dinner: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        }
      },
      required: ["breakfast", "lunch", "dinner"]
    },
    sunday: {
      type: Type.OBJECT,
      properties: {
        breakfast: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        lunch: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        },
        dinner: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  unit: { type: Type.STRING }
                },
                required: ["name", "amount", "unit"]
              }
            }
          },
          required: ["name", "ingredients"]
        }
      },
      required: ["breakfast", "lunch", "dinner"]
    }
  },
  required: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
}; 
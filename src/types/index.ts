import type { College, Course, Placement, Review, SavedCollege, User } from '@prisma/client';

export type CollegeWithRelations = College & {
  courses: Course[];
  placements: Placement[];
  reviews: (Review & { user: Pick<User, 'name' | 'image'> })[];
};

export type CollegeListItem = College & {
  _count?: {
    reviews: number;
  };
};

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export type CompareCollege = College & {
  courses: Course[];
  placements: Placement[];
  _count: {
    reviews: number;
  };
};

export type SavedCollegeResponse = SavedCollege & {
  college: College;
};

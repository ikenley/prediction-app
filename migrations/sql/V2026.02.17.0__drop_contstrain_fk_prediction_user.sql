-- Remove foreign key constraint from prediction.prediction to prediction.app_user

ALTER TABLE prediction.prediction DROP CONSTRAINT fk_prediction_user;

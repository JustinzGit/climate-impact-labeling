class EmissionCategoriesController < ApplicationController
  before_action :set_emission_category, only: [:show, :update, :destroy]

  # GET /emission_categories
  def index
    @emission_categories = EmissionCategory.all

    render json: @emission_categories
  end

  # GET /emission_categories/1
  def show
    render json: @emission_category
  end

  # POST /emission_categories
  def create
    @emission_category = EmissionCategory.new(emission_category_params)

    if @emission_category.save
      render json: @emission_category, status: :created, location: @emission_category
    else
      render json: @emission_category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /emission_categories/1
  def update
    if @emission_category.update(emission_category_params)
      render json: @emission_category
    else
      render json: @emission_category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /emission_categories/1
  def destroy
    @emission_category.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_emission_category
      @emission_category = EmissionCategory.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def emission_category_params
      params.fetch(:emission_category, {})
    end
end
